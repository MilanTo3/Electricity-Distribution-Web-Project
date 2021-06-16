using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.FormParts.SafetyDocument;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.AspNetCore.Http;
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
    public class SafetyDocsController : ControllerBase
    {

        private readonly ISafetyDoc _context;
        private UserManager<ApplicationUser> _userManager;

        public SafetyDocsController(UserManager<ApplicationUser> userManager, ISafetyDoc context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        [Route("postDoc")]
        public async Task<IActionResult> postSafetyDoc([FromBody] SafetyDocumentViewModel wrapper) {

            try
            {
                await _context.AddSafetyDoc(wrapper);
                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
