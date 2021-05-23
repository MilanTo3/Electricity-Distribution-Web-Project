using DistributionSmartEnergyBackApp.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.Interfaces
{
    public interface ITeam
    {
        Task<TeamModel> GetTeam(long id);
        Task AddTeam(string team, string[] usernames);

        Task DeleteTeam(long id);

        Task UpdateTeam(long id, string name, string[] usernames);

        Task<IEnumerable<TeamMemberModel>> getAvailableMembers();

        Task<IEnumerable<TeamModel>> GetTeams();
        Task<IEnumerable<TeamMemberModel>> getTeamMembers(long id);
        Task Save();
    }
}
