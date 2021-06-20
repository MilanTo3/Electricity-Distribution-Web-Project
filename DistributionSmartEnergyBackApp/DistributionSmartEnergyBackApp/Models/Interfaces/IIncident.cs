using DistributionSmartEnergyBackApp.Models.FormParts.Incident;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.Interfaces
{
    public interface IIncident 
    {
        Task<long> AddIncident(IncidentViewModel wrapper);

        Task<BasicInformationIN> GetBasicInfo(string id);

        Task Save();

        Task<IEnumerable<BasicInformationIN>> GetMyBasicInfo(string username);
        Task<IEnumerable<BasicInformationIN>> GetAllBasicInfo();


        Task<Resolution> GetResolutionList(string id);
        Task UpdateResolutionList(Resolution res);
    }
}
