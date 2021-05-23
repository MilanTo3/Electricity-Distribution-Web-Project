using DistributionSmartEnergyBackApp.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.Interfaces
{
    public interface ICall
    {
        Task<CallModel> GetCall(long id);
        Task AddNewCall(CallModel call);

        Task DeleteCall(long id);

        Task UpdateCall(CallModel call);

        Task<IEnumerable<CallModel>> GetCalls();
    }
}
