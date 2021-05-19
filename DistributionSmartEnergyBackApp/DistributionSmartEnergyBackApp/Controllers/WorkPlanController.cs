using DistributionSmartEnergyBackApp.Models.FormParts.WorkPlan;
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
    public class WorkPlanController : ControllerBase
    {

        [HttpPost]
        [Route("postRequest")]
        public async Task<IActionResult> postWorkRequest([FromBody] WorkPlanViewModel wrapper) {

            try {

                return Ok();
            }
            catch {
                return BadRequest();
            }
        }

    }
}
