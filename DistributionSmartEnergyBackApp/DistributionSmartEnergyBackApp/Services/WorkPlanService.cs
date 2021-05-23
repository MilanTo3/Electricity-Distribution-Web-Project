using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.FormParts;
using DistributionSmartEnergyBackApp.Models.FormParts.WorkPlan;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Services
{
    public class WorkPlanService : IWorkPlan
    {
        private readonly AuthenticationContext _context;

        public WorkPlanService(AuthenticationContext context)
        {
            _context = context;
        }
        public async Task<long> AddWorkPlan(WorkPlanViewModel wrapper)
        {
            WorkPlanModel wp = new WorkPlanModel();
            _context.WorkPlans.Add(wp);
            await _context.SaveChangesAsync(true);

            wrapper.basicInformationForm.DocumentId = "WP" + wp.Id;
            wrapper.basicInformationForm.createdDateTime = DateTime.Now;
            _context.BasicInformationsWP.Add(wrapper.basicInformationForm);

            return wp.Id;
        }

        public async Task<IEnumerable<BasicInformationWP>> GetAllBasicInfo()
        {
            return await _context.BasicInformationsWP.ToListAsync();

        }

        public async Task<IEnumerable<SwitchingInstruction>> GetAllSwitchingInstructions()
        {
            return await _context.SwitchingInstructions.ToListAsync();

        }

        public async Task<BasicInformationWP> GetBasicInfo(string id)
        {
            return await _context.BasicInformationsWP.FirstOrDefaultAsync(x => x.DocumentId == id);
        }

        public async Task<IEnumerable<HistoryOfStateChanges>> GetHistory(string id)
        {
            return await _context.HistoryChanges.Where(x => x.DocumentId == id).ToListAsync();
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBasicInfo(BasicInformationWP basicInfo)
        {
            var info = await _context.BasicInformationsWP.FirstOrDefaultAsync(x => x.DocumentId == basicInfo.DocumentId);

            if (info != null)
            {
                info.endDateTime = basicInfo.endDateTime;
                info.startDateTime = basicInfo.startDateTime;
                info.phoneNumber = basicInfo.phoneNumber;
                info.Notes = basicInfo.Notes;
                info.Purpose = basicInfo.Purpose;
                info.Company = basicInfo.Company;
                info.Type = basicInfo.Type;
                info.crewId = basicInfo.crewId;           
                info.Status = basicInfo.Status;
                info.locationId = basicInfo.locationId;
                info.user = basicInfo.user;
                if(basicInfo.Type == "Planned work")
                {
                    info.incidentId = "";
                    info.workRequestId = ""; //receno je da moze da postoji wp bez incidenta ili requesta
                }
                else
                {
                    info.workRequestId = basicInfo.workRequestId;
                    info.incidentId = basicInfo.incidentId;
                }
                _context.BasicInformationsWP.Update(info);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateHistory(HistoryOfStateChanges[] changes)
        {
            await _context.HistoryChanges.AddRangeAsync(changes);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSwitchingInstructions(SwitchingInstruction switchingInstructions)
        {
            throw new NotImplementedException();
        }
    }
}
