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
    public class CallService : ICall
    {

        private readonly AuthenticationContext _context;

        public CallService(AuthenticationContext context)
        {
            _context = context;
        }
        public async Task AddNewCall(CallModel call)
        {
            call.documentId = "none";
            _context.Calls.Add(call);
            await _context.SaveChangesAsync(true);
        }

        public async Task DeleteCall(long id)
        {
            var call = await _context.Calls.FindAsync(id);

            _context.Calls.Remove(call);

            await _context.SaveChangesAsync();
        }

        public async Task<CallModel> GetCall(long id)
        {
            return await _context.Calls.FindAsync(id);
        }

        public async Task<IEnumerable<CallModel>> GetCalls()
        {
            return await _context.Calls.ToListAsync();
        }

        public async Task<IEnumerable<long>> GetConnectedCalls(string documentID)
        {
            var callList = await _context.Calls.Where(x => x.documentId == documentID).ToListAsync();

            if (callList != null)
            {
                return callList.Select(x => x.Id).ToList();              
            }

            return null;
            
        }

        public async Task UpdateCall(CallModel c)
        {
            var call = await _context.Calls.FindAsync(c.Id);
            if (call != null)
            {
                call.LocationId = c.LocationId;
                call.Reason = c.Reason;
                call.Comment = c.Comment;
                call.Hazzard = c.Hazzard;
              
                _context.Calls.Update(call);
                await _context.SaveChangesAsync();
            }
        }

    }
}
