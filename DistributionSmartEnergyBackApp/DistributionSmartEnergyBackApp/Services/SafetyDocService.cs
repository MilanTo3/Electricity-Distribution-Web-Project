using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.FormParts.SafetyDocument;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Services
{
    public class SafetyDocService : ISafetyDoc
    {
        private readonly AuthenticationContext _context;

        public SafetyDocService(AuthenticationContext context)
        {
            _context = context;
        }
        public async Task<long> AddSafetyDoc(SafetyDocumentViewModel wrapper)
        {
            SafetyDocumentModel sd = new SafetyDocumentModel();
            _context.SafetyDocuments.Add(sd);
            await _context.SaveChangesAsync(true);

            wrapper.infoForm.DocumentId = "SD" + sd.Id;
            wrapper.infoForm.DateCreated = DateTime.Now;
            _context.BasicInformationSD.Add(wrapper.infoForm);

            throw new NotImplementedException();
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
