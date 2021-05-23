using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.Interfaces
{
    public interface ILocation
    {
        Task<LocationModel> GetLocation(long id);
        Task AddLocation(LocationModel location);

        Task DeleteLocation(long id);

        Task UpdateLocation(LocationModel location);

        Task<IEnumerable<LocationModel>> GetLocations();
    }
}
