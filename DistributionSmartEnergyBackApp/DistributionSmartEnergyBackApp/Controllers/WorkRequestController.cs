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

        [HttpGet]
        [Route("GetAllBasicInfo")]
        public async Task<IEnumerable<BasicInformationWR>> GetAllBasicInformations() {
            return await _context.GetAllBasicInfo();
        }

        [HttpGet]
        [Route("GetBasicInfo")]
        public async Task<BasicInformationWR> GetBasicInformation(string id) {
            return await _context.GetBasicInfo(id);
        }

        [HttpGet]
        [Route("GetHistory")]
        public async Task<IEnumerable<HistoryOfStateChanges>> GetHistory(string id) {
            return await _context.GetHistory(id);
        }

        [HttpGet]
        [Route("GetAttachments")]
        public async Task<IActionResult> GetAttachments(string id) {

            string folderName = Path.Combine("Resources", "WorkRequestsMA");
            string pathToRead = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            var filePath = Path.Combine(pathToRead, id);
            if (!System.IO.Directory.Exists(filePath))
                return NotFound();

            DirectoryInfo d = new DirectoryInfo(filePath);
            FileInfo[] Files = d.GetFiles();

            List<pictureModel> pc = new List<pictureModel>();
            foreach (FileInfo file in Files) {
                pc.Add(new pictureModel(file.Name, "data:image/png;base64," + Convert.ToBase64String(System.IO.File.ReadAllBytes(Path.Combine(filePath, file.Name)))));
            }

            return Ok(pc);
        }

    }
}
