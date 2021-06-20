using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.FormParts.Incident;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using VirusTotalNet;
using VirusTotalNet.ResponseCodes;
using VirusTotalNet.Results;

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
            try
            {
                long id = await _context.AddIncident(wrapper);
                int virusScan = await uploadAttachments(wrapper.mediaForm, id);
                await _context.Save();
                return Ok(virusScan);
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Route("GetAllBasicInfo")]

        public async Task<IEnumerable<BasicInformationIN>> GetAllBasicInfoController()
        {
            return await _context.GetAllBasicInfo();
        }

        [HttpGet]
        [Route("GetBasicInfo")]
        public async Task<BasicInformationIN> GetBasicInformationController(string id)
        {
            return await _context.GetBasicInfo(id);
        }


        [HttpGet]
        [Route("GetMyBasicInfo")]
        public async Task<IEnumerable<BasicInformationIN>> GetMyBasicInformationController()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return await _context.GetMyBasicInfo(user.UserName);
        }


        [HttpGet]
        [Route("GetResolutionList")]
        public async Task<Resolution> GetResolutionListController(string id)
        {
            return await _context.GetResolutionList(id);
        }


        [HttpPost]
        [Route("UpdateBasicInfo")]
        public async Task<IActionResult> updateBasicInfo([FromBody] BasicInformationIN basicInfo)
        {
            try
            {
                await _context.UpdateBasicInformation(basicInfo);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpPost]
        [Route("UpdateResolutionList")]
        public async Task<IActionResult> UpdateResolutionListController([FromBody] Resolution res)
        {
            try
            {
                await _context.UpdateResolutionList(res);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Route("GetAttachments")]
        public async Task<IActionResult> GetAttachments(string id)
        {

            string folderName = Path.Combine("Resources", "IncidentsMA");
            string pathToRead = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            var filePath = Path.Combine(pathToRead, id);
            if (!System.IO.Directory.Exists(filePath))
                return NotFound();

            DirectoryInfo d = new DirectoryInfo(filePath);
            FileInfo[] Files = d.GetFiles();

            List<pictureModel> pc = new List<pictureModel>();
            foreach (FileInfo file in Files)
            {
                pc.Add(new pictureModel(file.Name, "data:image/png;base64," + Convert.ToBase64String(System.IO.File.ReadAllBytes(Path.Combine(filePath, file.Name)))));
            }

            return Ok(pc);
        }

        [HttpPost]
        [Route("UpdateAttachments")]
        public async Task<IActionResult> updateAttachments([FromForm] string[] stringPicModels, [FromForm] string[] currentFileList, [FromForm] string id)
        {

            int i;
            pictureModel[] files = new pictureModel[stringPicModels.Length];

            for (i = 0; i < stringPicModels.Length; i++)
            {
                files[i] = Newtonsoft.Json.JsonConvert.DeserializeObject<pictureModel>(stringPicModels[i]);
            }

            string folderName = Path.Combine("Resources", "IncidentsMA");
            string pathToRead = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            var filePath = Path.Combine(pathToRead, id);

            if (!System.IO.Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }

            // save files.
            int res = 0;
            foreach (pictureModel file in files)
            {
                string fullPath = Path.Combine(id, Path.Combine(filePath, file.name));
                saveImage(file.picture, fullPath);
                try
                {
                    res += await checkVirusScan(fullPath);
                }
                catch { }
            }

            DirectoryInfo d = new DirectoryInfo(filePath);
            FileInfo[] dirFiles = d.GetFiles();

            foreach (FileInfo directoryFile in dirFiles)
            {
                if (currentFileList.ToList().Exists(x => x == directoryFile.Name) == false)
                {
                    System.IO.File.Delete(directoryFile.FullName);
                }
            }

            return Ok();
        }

        private async Task<int> uploadAttachments(pictureModel[] mediaForm, long id)
        {

            string folderName = Path.Combine("Resources", "IncidentsMA");
            string requestsDir = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            string SDDir = Path.Combine(requestsDir, "IN" + id.ToString());
            Directory.CreateDirectory(SDDir);

            int i;
            int res = 0;
            for (i = 0; i < mediaForm.Length; i++)
            {
                string fullPath = Path.Combine(SDDir, mediaForm[i].name);
                saveImage(mediaForm[i].picture, fullPath);
                try
                {
                    res += await checkVirusScan(fullPath);
                }
                catch { }
            }

            return res;
        }

        public void saveImage(string picture, string fullpath)
        {
            //smestam sliku na lokaciju
            byte[] imageBytes = Convert.FromBase64String(picture.Split(',')[1]);
            System.IO.File.WriteAllBytes(fullpath, imageBytes);
        }

        private async Task<int> checkVirusScan(string path)
        {

            VirusTotal virusTotal = new VirusTotal("7fe789f54f1232794271c3d596d4da7a1b5dcb893587d9d9d958147bb91321e8"); //api key

            //Use HTTPS instead of HTTP
            virusTotal.UseTLS = true;

            byte[] eicar = System.IO.File.ReadAllBytes(path);

            //Check if the file has been scanned before.
            FileReport report = await virusTotal.GetFileReportAsync(eicar);

            Console.WriteLine("Seen before: " + (report.ResponseCode == FileReportResponseCode.Present ? "Yes" : "No"));
            if (report.Positives > 0)
            {
                System.IO.File.Delete(path); // delete file if infected.
            }

            return report.Positives;


        }


    }
}
