using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.FormParts;
using DistributionSmartEnergyBackApp.Models.FormParts.WorkPlan;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Formatters.Xml;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Services
{
    public class WorkPlanService : IWorkPlan
    {
        private readonly AuthenticationContext _context;

        public WorkPlanService( AuthenticationContext context)
        {
            _context = context;
        }
        public async Task<long> AddWorkPlan(WorkPlanViewModel wrapper)
        {
            WorkPlanModel wp = new WorkPlanModel();
            _context.WorkPlans.Add(wp);
            await _context.SaveChangesAsync(true);


            wrapper.basicInformationForm.DocumentId = "WP" + wp.Id;
            wrapper.basicInformationForm.createdDateTime = DateTime.Now;
            _context.BasicInformationsWP.Add(wrapper.basicInformationForm);

            if(wrapper.switchingInstructionsForm!=null)
            {
                foreach (SwitchingInstruction instruction in wrapper.switchingInstructionsForm)
                {
                    instruction.DocumentId = "WP" + wp.Id;
                    _context.SwitchingInstructions.Add(instruction);
                }
            }
            

            return wp.Id;
        }



        public async Task<IEnumerable<BasicInformationWP>> GetAllBasicInfo()
        {
            return await _context.BasicInformationsWP.ToListAsync();

        }
        public async Task<IEnumerable<BasicInformationWP>> GetMyBasicInfo(string username)
        {
            return await _context.BasicInformationsWP.Where(wp=> wp.user == username).ToListAsync();

        }
        public async Task<IEnumerable<SwitchingInstruction>> GetAllSwitchingInstructions()
        {
            return await _context.SwitchingInstructions.ToListAsync();

        }

        public async Task<BasicInformationWP> GetBasicInfo(string id)
        {
            return await _context.BasicInformationsWP.FirstOrDefaultAsync(x => x.DocumentId == id);
        }

        public async Task<IEnumerable<HistoryOfStateChanges>> GetHistory(string id)
        {
            return await _context.HistoryChanges.Where(x => x.DocumentId == id).ToListAsync();
        }
        public async Task<IEnumerable<SwitchingInstruction>> GetSwitchingInstructionsWP(string id)
        {
            return await _context.SwitchingInstructions.Where(x => x.DocumentId == id).ToListAsync();
        }
        public async Task DeleteBasicInfo(string id) {
            BasicInformationWP info = await _context.BasicInformationsWP.FindAsync(id);
            _context.BasicInformationsWP.Remove(info);
            await Save();
        }

        public async Task Save() {
            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException exception) {
                Console.WriteLine("Update concurrency greska.");
            }
        }

        public async Task UpdateBasicInfo(BasicInformationWP basicInfo)
        {
            var info = await _context.BasicInformationsWP.FirstOrDefaultAsync(x => x.DocumentId == basicInfo.DocumentId);


            if (info != null)
            {
                info.endDateTime = basicInfo.endDateTime;
                info.startDateTime = basicInfo.startDateTime;
                info.phoneNumber = basicInfo.phoneNumber;
                info.Notes = basicInfo.Notes;
                info.Purpose = basicInfo.Purpose;
                info.Company = basicInfo.Company;
                info.Type = basicInfo.Type;
                info.crewId = basicInfo.crewId;           
                info.Status = basicInfo.Status;
                info.locationId = basicInfo.locationId;
               // info.user = basicInfo.user;
                info.Street = basicInfo.Street;
                if(basicInfo.Type == "Planned work")
                {
                    info.incidentId = "noWR";
                    info.workRequestId = "noIN"; //receno je da moze da postoji wp bez incidenta ili requesta
                }
                else
                {
                    info.workRequestId = basicInfo.workRequestId;
                    info.incidentId = basicInfo.incidentId;
                }

                NotificationModel notification = new NotificationModel()
                {
                    Username = info.user,
                    Type = "Warning",
                    Timestamp = DateTime.Now,
                    Seen = false,
                    Content = "Your work plan " + info.DocumentId + " has been changed."
                };
                //_context.Notifications.Add(notification);

                try
                {
                    _context.BasicInformationsWP.Update(info);
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
            if (changes.Length == 0) {
                return;
            }
            await _context.HistoryChanges.AddRangeAsync(changes);

            string docId = changes[0].DocumentId;
            BasicInformationWP basicInfo = await _context.BasicInformationsWP.FirstOrDefaultAsync(x => x.DocumentId == docId);
            basicInfo.Status = changes[changes.Length - 1].Details.Split(' ')[changes[changes.Length - 1].Details.Split(' ').Length - 1].Replace(".", "");
            basicInfo.Status = basicInfo.Status.Substring(0, 1).ToUpper() + basicInfo.Status.Substring(1);

            NotificationModel notification = new NotificationModel()
            {
                Username = basicInfo.user,
                Timestamp = DateTime.Now,
                Type = basicInfo.Status == "Approved" ? "Success" : "Error",
                Seen = false,
                Content = "Status of your work plan" + basicInfo.DocumentId + " has been updated to " + basicInfo.Status
            };
          
            //_context.Notifications.Add(notification);

            try
            {

                _context.BasicInformationsWP.Update(basicInfo);
                await _context.SaveChangesAsync();
                //NotificationHub.Notify(notification);
            }
            catch (Exception)
            {

            }

        }

        public async Task UpdateSwitchingInstructions(SwitchingInstruction[] switchingInstructions)
        {
             _context.SwitchingInstructions.UpdateRange(switchingInstructions);
            await _context.SaveChangesAsync();
        }
        public Task DeleteSwitchingInstructions(SwitchingInstruction[] switchingInstructions)
        {
            throw new NotImplementedException();
        }
    }
}
