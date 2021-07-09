using Dapr.Client;
using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.FormParts;
using DistributionSmartEnergyBackApp.Models.FormParts.SafetyDocument;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Services
{
    public class SafetyDocService : ISafetyDoc
    {
        private readonly AuthenticationContext _context;

        public SafetyDocService(AuthenticationContext context)
        {
            _context = context;
        }
        public async Task<long> AddSafetyDoc(SafetyDocumentViewModel wrapper)
        {
            SafetyDocumentModel sd = new SafetyDocumentModel();
            _context.SafetyDocuments.Add(sd);
            await _context.SaveChangesAsync(true);

            wrapper.infoForm.DocumentId = "SD" + sd.Id;
            wrapper.infoForm.DateCreated = DateTime.Now;
            wrapper.checkListForm.DocumentId = "SD" + sd.Id;

            _context.BasicInformationSD.Add(wrapper.infoForm);
            _context.CheckListSD.Add(wrapper.checkListForm);

            await Save();

            return sd.Id;
        }

        public async Task DeleteBasicInfo(string id)
        {
            BasicInformationSD info = await _context.BasicInformationSD.FindAsync(id);
            _context.BasicInformationSD.Remove(info);
            await Save();
        }

        public async Task<IEnumerable<BasicInformationSD>> GetAllBasicInfo()
        {
            return await _context.BasicInformationSD.ToListAsync();
        }

        public async Task<BasicInformationSD> GetBasicInfo(string id)
        {
            return await _context.BasicInformationSD.FirstOrDefaultAsync(x => x.DocumentId == id);
        }

        public async Task<CheckList> GetCheckList(string id)
        {
            return await _context.CheckListSD.FirstOrDefaultAsync(x => x.DocumentId == id);
        }


        public async Task<IEnumerable<BasicInformationSD>> GetMyBasicInfo(string username)
        {
            return await _context.BasicInformationSD.Where(x => x.User == username).ToListAsync();
        }

        public async Task Save()
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException exception)
            {
                Console.WriteLine("Update concurrency greska.");
            }
        }

        public async Task UpdateBasicInfo(BasicInformationSD basicInfo)
        {
            var info = await _context.BasicInformationSD.FirstOrDefaultAsync(x => x.DocumentId == basicInfo.DocumentId);

            if (info != null)
            {
                info.Type = basicInfo.Type;
                info.Notes = basicInfo.Notes;
                info.PhoneNumber = basicInfo.PhoneNumber;
                info.Crew = basicInfo.Crew;
                info.Details = basicInfo.Details;
                info.DateCreated = basicInfo.DateCreated;
            }

            NotificationModel notification = new NotificationModel()
            {
                Username = info.User,
                Type = "Warning",
                Timestamp = DateTime.Now,
                Seen = false,
                Content = "Your safety document " + info.DocumentId + " has been changed."
            };
            //_context.Notifications.Add(notification);
            var daprClient = new DaprClientBuilder().Build();
            var request = daprClient.CreateInvokeMethodRequest("notificationmicroservice", "/api/Notification/AddNotification", notification);
            var response = await daprClient.InvokeMethodWithResponseAsync(request);
            response.EnsureSuccessStatusCode();

            try
            {
                _context.BasicInformationSD.Update(info);
                await Save();
                
            }
            catch (Exception)
            {

            }
        }

        public async Task UpdateCheckList(CheckList ch)
        {
            var info = await _context.CheckListSD.FirstOrDefaultAsync(x => x.DocumentId == ch.DocumentId);

            if(info != null)
            {
                info.FirstCheck = ch.FirstCheck;
                info.SecondCheck = ch.SecondCheck;
                info.ThirdCheck = ch.ThirdCheck;
                info.FourthCheck = ch.FourthCheck;

                NotificationModel notification = new NotificationModel()
                {
                    Username = "",
                    Type = "Warning",
                    Timestamp = DateTime.Now,
                    Seen = false,
                    Content = "Your safety document " + info.DocumentId + " has been changed."
                };
                //_context.Notifications.Add(notification);
                var daprClient = new DaprClientBuilder().Build();
                var request = daprClient.CreateInvokeMethodRequest("notificationmicroservice", "/api/Notification/AddNotification", notification);
                var response = await daprClient.InvokeMethodWithResponseAsync(request);
                response.EnsureSuccessStatusCode();

                try
                {

                    _context.CheckListSD.Update(info);
                    await Save();
                    //NotificationHub.Notify(notification);
                }
                catch (Exception)
                {

                }
            }


        }

        public async Task UpdateHistory(HistoryOfStateChanges[] changes)
        {
            if (changes.Length == 0)
            {
                return;
            }
            await _context.HistoryChanges.AddRangeAsync(changes);

            string docId = changes[0].DocumentId;
            BasicInformationSD basicInfo = await _context.BasicInformationSD.FirstOrDefaultAsync(x => x.DocumentId == docId);

            NotificationModel notification = new NotificationModel()
            {
                Username = basicInfo.User,
                //Type = basicInfo.Status == "Approved" ? "Success" : "Error",
                Timestamp = DateTime.Now,
                Seen = false,
                //Content = "Status of your work request " + basicInfo.DocumentId + " has been updated to " + basicInfo.Status
            };
            //_context.Notifications.Add(notification);

            try
            {

                _context.BasicInformationSD.Update(basicInfo);
                await _context.SaveChangesAsync();
                //NotificationHub.Notify(notification);
            }
            catch (Exception)
            {

            }
        }
    }
}
