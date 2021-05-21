using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Services
{
    public class TeamService : ITeam
    {

        private readonly AuthenticationContext _context;

        public TeamService(AuthenticationContext context) {
            _context = context;
        }

        public Task AddTeam(TeamModel team, string[] usernames) {
            throw new NotImplementedException();
        }

        public async Task DeleteTeam(long id) {
            var team = await _context.DispatchTeams.FindAsync(id);

            _context.DispatchTeams.Remove(team);
        }

        public async Task<TeamModel> GetTeam(long id) {
            return await _context.DispatchTeams.FindAsync(id);
        }

        public async Task<IEnumerable<TeamModel>> GetTeams() {
            return await _context.DispatchTeams.ToListAsync();
        }

        public async Task UpdateTeam(long id, string name, string[] usernames) {
            var team = await _context.DispatchTeams.FindAsync(id);

            if (team != null) {
                team.Name = name;
                _context.DispatchTeams.Update(team);
                await _context.SaveChangesAsync();
            }
        }

        public async Task Save() {
            await _context.SaveChangesAsync();
        }
    }
}
