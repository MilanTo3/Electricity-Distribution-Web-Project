using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.FormParts;
using DistributionSmartEnergyBackApp.Models.FormParts.WorkRequest;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Services
{
    public class WorkRequestService : IWorkRequest
    {
        private readonly AuthenticationContext _context;

        public WorkRequestService(AuthenticationContext context) {
            _context = context;
        }

        public async Task<long> AddWorkRequest(WorkRequestViewModel wrapper) {
            WorkRequestModel wr = new WorkRequestModel();
            _context.WorkRequests.Add(wr);
            await _context.SaveChangesAsync(true);

            wrapper.infoForm.DocumentId = "WR"+wr.Id;
            wrapper.infoForm.DateCreated = DateTime.Now;
            _context.BasicInformationsWR.Add(wrapper.infoForm);

            return wr.Id;
        }

        public async Task<IEnumerable<BasicInformationWR>> GetAllBasicInfo() {
            return await _context.BasicInformationsWR.ToListAsync();
        }

        public async Task<BasicInformationWR> GetBasicInfo(string id) {
            return await _context.BasicInformationsWR.FirstOrDefaultAsync(x => x.DocumentId == id);
        }

        public async Task<IEnumerable<HistoryOfStateChanges>> GetHistory(string id) {
            return await _context.HistoryChanges.Where(x => x.DocumentId == id).ToListAsync();
        }

        public async Task UpdateBasicInfo(BasicInformationWR basicInfo) {

            var info = await _context.BasicInformationsWR.FirstOrDefaultAsync(x => x.DocumentId == basicInfo.DocumentId);

            if (info != null) {
                info.Company = basicInfo.Company;
                info.Details = basicInfo.Details;
                info.emergency = basicInfo.emergency;
                info.endDate = basicInfo.endDate;
                info.Notes = basicInfo.Notes;
                info.PhoneNumber = basicInfo.PhoneNumber;
                info.Purpose = basicInfo.Purpose;
                info.startDate = basicInfo.startDate;
                info.Status = basicInfo.Status;
                info.Street = basicInfo.Street;
                info.Type = basicInfo.Type;
                _context.BasicInformationsWR.Update(info);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateHistory(HistoryOfStateChanges[] changes) {

            await _context.HistoryChanges.AddRangeAsync(changes);
            await _context.SaveChangesAsync();
        }

        public async Task Save() {
            await _context.SaveChangesAsync();
        }
    }
}
