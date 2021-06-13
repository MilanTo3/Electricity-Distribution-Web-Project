using DistributionSmartEnergyBackApp.Models.FormParts.SafetyDocument;
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
    public class SafetyDocsController : ControllerBase
    {

        [HttpPost]
        [Route("postDoc")]
        public async Task<IActionResult> postSafetyDocs([FromBody] SafetyDocumentViewModel wrapper) {

            return Ok("ok");
        }

    }
}
