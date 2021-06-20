using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.FormParts.Incident;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Services
{
    public class IncidentService : IIncident
    {
        private readonly AuthenticationContext _context;

        public IncidentService(AuthenticationContext context)
        {
            _context = context;
        }

        public async Task<long> AddIncident(IncidentViewModel wrapper)
        {
            IncidentModel inc = new IncidentModel();



            return inc.Id; 

        }

        public async Task Save()
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException exception)
            {
                Console.WriteLine("Update concurrency greska.");
            }
        }
    }
}
