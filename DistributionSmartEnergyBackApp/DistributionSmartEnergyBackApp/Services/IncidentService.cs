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
            _context.Incidents.Add(inc);
            await _context.SaveChangesAsync(true);

            wrapper.infoForm.DocumentId = "IN" + inc.Id;

            if(wrapper.teamId != null)
            {
                wrapper.infoForm.teamId = Int32.Parse(wrapper.teamId);
            }
           
            _context.BasicInformationIN.Add(wrapper.infoForm);

            wrapper.resolutionForm.documentId = "IN" + inc.Id;
            _context.ResolutionIN.Add(wrapper.resolutionForm);

            foreach(long id in wrapper.callIds)
            {
                var call = await _context.Calls.FindAsync(id);
                if(call != null)
                {
                    call.documentId = "IN" + inc.Id;
                }
            }

            foreach (long id in wrapper.devicesIds)
            {
                var device = await _context.Devices.FindAsync(id);
                if (device != null)
                {
                    device.documentId = "IN" + inc.Id;
                }
            }

            await _context.SaveChangesAsync();
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
