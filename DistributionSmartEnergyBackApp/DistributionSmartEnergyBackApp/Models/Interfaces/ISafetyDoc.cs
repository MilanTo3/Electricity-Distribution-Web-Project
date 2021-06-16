using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.FormParts.SafetyDocument;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.Interfaces
{
    public interface ISafetyDoc
    {
        Task<long> AddSafetyDoc(SafetyDocumentViewModel wrapper);
    }
}
