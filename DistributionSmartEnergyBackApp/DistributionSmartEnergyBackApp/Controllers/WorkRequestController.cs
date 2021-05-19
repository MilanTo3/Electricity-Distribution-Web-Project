using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.FormParts;
using DistributionSmartEnergyBackApp.Models.FormParts.WorkRequest;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkRequestController : ControllerBase
    {

        private readonly IWorkRequest _context;
        public WorkRequestController(IWorkRequest context) {
            _context = context;
        }

        [HttpPost]
        [Route("postRequest")]
        public async Task<IActionResult> postWorkRequest([FromBody]WorkRequestViewModel wrapper) {

            try {
                long id = await _context.AddWorkRequest(wrapper);

                return Ok(id);
            }
            catch {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("sendAttachments")]
        public async Task<IActionResult> uploadAttachments([FromForm] IFormFile[] mediaForm, [FromForm] int id) {

            string folderName = Path.Combine("Resources", "WorkRequestsMA");
            string requestsDir = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            string WRDir = Path.Combine(requestsDir, "WR" + id.ToString());
            Directory.CreateDirectory(WRDir);

            int i;
            for (i = 0; i < mediaForm.Length; i++) {
                string fullPath = Path.Combine(WRDir, mediaForm[i].FileName);
                saveImage(mediaForm[i], fullPath);
            }

            return Ok();
        }

        public void saveImage(IFormFile file, string fullpath) {
            //smestam sliku na lokaciju
            using (var stream = new FileStream(fullpath, FileMode.Create)) {
                file.CopyTo(stream);
            }
        }

    }
}
