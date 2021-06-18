using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
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

        public async Task AddTeam(string team, string[] usernames) {

            TeamModel teamModel = new TeamModel(team);
            await _context.DispatchTeams.AddAsync(teamModel);
            _context.SaveChanges();

            foreach (string member in usernames) {
                ApplicationUser user = await _context.applicationUsers.FirstOrDefaultAsync(x => x.UserName == member);
                if (user != null) {
                    user.TeamId = teamModel.Id.ToString();
                }
            }

        }

        public async Task DeleteTeam(long id) {
            var team = await _context.DispatchTeams.FindAsync(id);

            _context.DispatchTeams.Remove(team);

            var members = _context.applicationUsers.Where(x => x.TeamId == id.ToString());
            await members.ForEachAsync(x => x.TeamId = "none");
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
            }

            var thisTeamsMembers = await _context.applicationUsers.Where(x => x.TeamId == id.ToString()).ToListAsync();
            thisTeamsMembers.ToList().ForEach(x => x.TeamId = "none");

            foreach (string member in usernames) {
                ApplicationUser user = await _context.applicationUsers.FirstOrDefaultAsync(x => x.UserName == member);
                if (user != null) {
                    user.TeamId = id.ToString();
                }
            }

        }

        public async Task Save() {
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TeamMemberModel>> getAvailableMembers() {

            var availableMembers = await _context.applicationUsers.Where(x => x.UserType == ApplicationUser.UserTypeEnumeration.TeamMember && x.TeamId == "none").ToListAsync();

            List<TeamMemberModel> members = new List<TeamMemberModel>();
            foreach (ApplicationUser teamMember in availableMembers) {

                members.Add(new TeamMemberModel(teamMember.UserName, teamMember.Name, teamMember.Lastname, getBase64FileImg(teamMember.FilePicture)));
            }

            return members;
        }

        private string getBase64FileImg(string filename) {

            if (filename == null) {
                return null;
            }

            string folderName = Path.Combine("Resources", "UsersPics");
            string pathToRead = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            string fullPath = Path.Combine(pathToRead, filename);

            string image = "data:image/png;base64," + Convert.ToBase64String(System.IO.File.ReadAllBytes(fullPath));

            return image;
        }

        public async Task<IEnumerable<TeamMemberModel>> getTeamMembers(long id) {

            var members = await _context.applicationUsers.Where(x => x.TeamId == id.ToString()).ToListAsync();
            List<TeamMemberModel> teamMembers = new List<TeamMemberModel>();

            foreach(ApplicationUser teamMate in members) {
                teamMembers.Add(new TeamMemberModel(teamMate.UserName, teamMate.Name, teamMate.Lastname, getBase64FileImg(teamMate.FilePicture)));
            }

            return teamMembers.ToList();
        }
    }
}
