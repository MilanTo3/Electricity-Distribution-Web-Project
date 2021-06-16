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
            wrapper.checkListForm.DocumentId = "SD" + sd.Id;

            _context.BasicInformationSD.Add(wrapper.infoForm);
            _context.CheckListSD.Add(wrapper.checkListForm);

            await Save();

            return sd.Id;
        }

        public async Task<IEnumerable<BasicInformationSD>> GetAllBasicInfo()
        {
            return await _context.BasicInformationSD.ToListAsync();
        }

        public async Task<BasicInformationSD> GetBasicInfo(string id)
        {
            return await _context.BasicInformationSD.FirstOrDefaultAsync(x => x.DocumentId == id);
        }

        public async Task<CheckList> GetCheckList(string id)
        {
            return await _context.CheckListSD.FirstOrDefaultAsync(x => x.DocumentId == id);
        }


        public async Task<IEnumerable<BasicInformationSD>> GetMyBasicInfo(string username)
        {
            return await _context.BasicInformationSD.Where(x => x.User == username).ToListAsync();
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
