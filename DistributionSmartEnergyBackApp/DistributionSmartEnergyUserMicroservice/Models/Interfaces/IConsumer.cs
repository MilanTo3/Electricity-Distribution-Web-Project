using DistributionSmartEnergyUserMicroservice.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyUserMicroservice.Models.Interfaces
{
    public interface IConsumer
    {
        Task<ConsumerModel> GetConsumer(string username);
        Task AddNewConsumer(ConsumerModel consumer);

        Task DeleteConsumer(string username);

        Task UpdateConsumer(ConsumerModel consumer);

        Task<IEnumerable<ConsumerModel>> GetConsumers();
    }
}
