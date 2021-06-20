using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.FormParts.Incident;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class IncidentController : ControllerBase
    {
        private readonly IIncident _context;
        private UserManager<ApplicationUser> _userManager;

        public IncidentController(UserManager<ApplicationUser> userManager, IIncident context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        [Route("postIncident")]

        public async Task<IActionResult> postIncident([FromBody] IncidentViewModel wrapper)
        {
            return BadRequest();
        }


    }
}
