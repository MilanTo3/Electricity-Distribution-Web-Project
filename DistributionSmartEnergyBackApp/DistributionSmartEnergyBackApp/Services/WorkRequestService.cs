using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.FormParts;
using DistributionSmartEnergyBackApp.Models.FormParts.WorkRequest;
using DistributionSmartEnergyBackApp.Models.Interfaces;
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
            _context.BasicInformationsWR.Add(wrapper.infoForm);
            await _context.SaveChangesAsync();

            return wr.Id;
        }

        public Task DeleteWorkRequest(long id) {
            throw new NotImplementedException();
        }

        public Task<WorkRequestModel> GetWorkRequest(long id) {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<WorkRequestModel>> GetWorkRequest() {
            throw new NotImplementedException();
        }

        public Task UpdateWorkRequest(WorkRequestModel location) {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<BasicInformationWR>> GetAllBasicInfo() {
            return await _context.BasicInformationsWR.ToListAsync();
        }

        public async Task<BasicInformationWR> GetBasicInfo(string id) {
            return await _context.BasicInformationsWR.FirstOrDefaultAsync(x => x.DocumentId == id);
        }

        public async Task Save() {
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<HistoryOfStateChanges>> GetHistory(string id) {
            return await _context.HistoryChanges.Where(x => x.DocumentId == id).ToListAsync();
        }

    }
}
