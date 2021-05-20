using DistributionSmartEnergyBackApp.Models.FormParts;
using DistributionSmartEnergyBackApp.Models.FormParts.WorkRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.Interfaces
{
    public interface IWorkRequest
    {
        Task<WorkRequestModel> GetWorkRequest(long id);
        Task<long> AddWorkRequest(WorkRequestViewModel location);

        Task DeleteWorkRequest(long id);

        Task UpdateWorkRequest(WorkRequestModel location);

        Task<IEnumerable<WorkRequestModel>> GetWorkRequest();

        Task<IEnumerable<BasicInformationWR>> GetAllBasicInfo();
        Task<BasicInformationWR> GetBasicInfo(string id);
        Task<IEnumerable<HistoryOfStateChanges>> GetHistory(string id);

        Task Save();
    }
}