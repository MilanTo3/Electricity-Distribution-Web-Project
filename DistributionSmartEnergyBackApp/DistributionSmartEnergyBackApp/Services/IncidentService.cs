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

            if (wrapper.callIds != null)
            {
                foreach (long id in wrapper.callIds)
                {
                    var call = await _context.Calls.FindAsync(id);
                    if (call != null)
                    {
                        call.documentId = "IN" + inc.Id;
                    }
                }
            }

            if (wrapper.devicesIds != null)
            {
                foreach (long id in wrapper.devicesIds)
                {
                    var device = await _context.Devices.FindAsync(id);
                    if (device != null)
                    {
                        device.documentId = "IN" + inc.Id;
                    }
                }
            }

            await _context.SaveChangesAsync();
            return inc.Id; 

        }

        public async Task<IEnumerable<BasicInformationIN>> GetAllBasicInfo()
        {
            return await _context.BasicInformationIN.ToListAsync();
        }

        public async Task<BasicInformationIN> GetBasicInfo(string id)
        {
            return await _context.BasicInformationIN.FirstOrDefaultAsync(x => x.DocumentId == id);
        }

        public async Task<IEnumerable<BasicInformationIN>> GetMyBasicInfo(string username)
        {
            return await _context.BasicInformationIN.Where(x => x.dispatcher == username).ToListAsync();
        }

        public async Task<Resolution> GetResolutionList(string id)
        {
            return await _context.ResolutionIN.FirstOrDefaultAsync(x => x.documentId == id);
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

        public async Task UpdateBasicInformation(BasicInformationIN basicInfo)
        {
            var incidentInfo = await _context.BasicInformationIN.FirstOrDefaultAsync(x => x.DocumentId == basicInfo.DocumentId);

            if (incidentInfo != null)
            {
                incidentInfo.Type = basicInfo.Type;
                incidentInfo.dispatcher = basicInfo.dispatcher;
                incidentInfo.Status = basicInfo.Status;
                incidentInfo.emergency = basicInfo.emergency;
                incidentInfo.confirmed = basicInfo.confirmed;
                incidentInfo.ETA = basicInfo.ETA;
                incidentInfo.ATA = basicInfo.ATA;
                incidentInfo.incidentTime = basicInfo.incidentTime;
                incidentInfo.ETR = basicInfo.ETR;
                incidentInfo.affectedCustoms = basicInfo.affectedCustoms;
                incidentInfo.callNum = basicInfo.callNum;
                incidentInfo.voltage = basicInfo.voltage;
                incidentInfo.scheduledTime = basicInfo.scheduledTime;

                _context.BasicInformationIN.Update(incidentInfo);

                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateResolutionList(Resolution resolution)
        {
            var resolutionInfo = await _context.ResolutionIN.FirstOrDefaultAsync(x => x.documentId == resolution.documentId);

            if (resolutionInfo != null)
            {
                resolutionInfo.cause = resolution.cause;
                resolutionInfo.subcause = resolution.subcause;
                resolutionInfo.constructionType = resolution.constructionType;
                resolutionInfo.material = resolution.material;

                _context.ResolutionIN.Update(resolutionInfo);
                await _context.SaveChangesAsync();

            }
        }
    }
}
