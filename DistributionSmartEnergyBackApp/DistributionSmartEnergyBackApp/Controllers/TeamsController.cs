using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {

        private readonly ITeam _context;

        public TeamsController(ITeam context) {
            _context = context;
        }

        [HttpGet]
        [Route("getAvailableTeamMembers")]
        public async Task<IActionResult> getAvailableMembers() {

            try {
                var members = await _context.getAvailableMembers();
                return Ok(members);
            }
            catch {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getTeams")]
        public async Task<IActionResult> getTeams() {

            try {
                var teams = await _context.GetTeams();
                return Ok(teams);
            }
            catch {
                return BadRequest();
            }

        }

        [HttpGet]
        [Route("getTeam")]
        public async Task<IActionResult> getTeam(long id) {

            try {
                var team = await _context.GetTeam(id);
                return Ok(team);
            }
            catch {
                return BadRequest();
            }

        }

        [HttpPost]
        [Route("addTeam")]
        public async Task<IActionResult> addTeams([FromForm]string team, [FromForm]string[] usernames) {

            try {

                await _context.AddTeam(team, usernames);
                await _context.Save();
                return Ok();
            }
            catch {
                return BadRequest();
            }

        }

        [HttpPost]
        [Route("updateTeam")]
        public async Task<IActionResult> updateTeams([FromForm]long id, [FromForm]string team, [FromForm]string[] usernames) {

            try {
                await _context.UpdateTeam(id, team, usernames);
                await _context.Save();
                return Ok();
            }
            catch {
                return BadRequest();
            }

        }

        [HttpPost]
        [Route("deleteTeam")]
        public async Task<IActionResult> deleteTeams([FromForm]long id) {

            try {

                await _context.DeleteTeam(id);
                await _context.Save();
                return Ok();
            }
            catch {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getMembers")]
        public async Task<IActionResult> getTeamMembers(long id) {

            try {

                var teamMembers = await _context.getTeamMembers(id);
                return Ok(teamMembers);
            }
            catch {
                return BadRequest();
            }

        }

    }
}
