using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Services
{
    public class ConsumerService : IConsumer
    {
        private readonly AuthenticationContext _context;

        public ConsumerService(AuthenticationContext context)
        {
            _context = context;
        }
        public async Task AddNewConsumer(ConsumerModel consumer)
        {
            _context.Consumers.Add(consumer);
            await _context.SaveChangesAsync(true);
        }

        public async Task DeleteConsumer(string username)
        {
            var consumer = await _context.Consumers.FindAsync(username);

            _context.Consumers.Remove(consumer);

            await _context.SaveChangesAsync();
        }

        public async Task<ConsumerModel> GetConsumer(string username)
        {
            return await _context.Consumers.FindAsync(username);
        }

        public async Task<IEnumerable<ConsumerModel>> GetConsumers()
        {
            return await _context.Consumers.ToListAsync();
        }

        public async Task UpdateConsumer(ConsumerModel consumer)
        {
            var c = await _context.Consumers.FindAsync(consumer.Username);
            if (c != null)
            {
                c.Type = consumer.Type;
                c.Priority = consumer.Priority;

                _context.Consumers.Update(c);
                await _context.SaveChangesAsync();
            }
        }
    }
}
