using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.FormParts;
using DistributionSmartEnergyBackApp.Models.FormParts.WorkPlan;
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
    public class WorkPlanController : ControllerBase
    {
        private readonly IWorkPlan _context;
        public WorkPlanController(IWorkPlan context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("postRequest")]
        public async Task<IActionResult> postWorkRequest([FromBody] WorkPlanViewModel wrapper) {

            try
            {
                long id = await _context.AddWorkPlan(wrapper);
                uploadAttachments(wrapper.mediaForm, id);
                await _context.Save();
                return Ok(id);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetAllBasicInfo")]
        public async Task<IEnumerable<BasicInformationWP>> GetAllBasicInformations()
        {
            return await _context.GetAllBasicInfo();
        }

        [HttpGet]
        [Route("GetBasicInfo")]
        public async Task<BasicInformationWP> GetBasicInformation(string id)
        {
            return await _context.GetBasicInfo(id);
        }

        [HttpGet]
        [Route("GetHistory")]
        public async Task<IEnumerable<HistoryOfStateChanges>> GetHistory(string id)
        {
            return await _context.GetHistory(id);
        }

        [HttpGet]
        [Route("GetAttachments")]
        public async Task<IActionResult> GetAttachments(string id)
        {

            string folderName = Path.Combine("Resources", "WorkPlansMA");
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
        public async Task<IActionResult> updateAttachments([FromForm] string[] stringPicModels, [FromForm]string[] currentFileList, [FromForm]string id)
        {

            int i;
            pictureModel[] files = new pictureModel[stringPicModels.Length];

            for (i = 0; i < stringPicModels.Length; i++)
            {
                files[i] = Newtonsoft.Json.JsonConvert.DeserializeObject<pictureModel>(stringPicModels[i]);
            }

            string folderName = Path.Combine("Resources", "WorkRequestsMA");
            string pathToRead = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            var filePath = Path.Combine(pathToRead, id);

            if (!System.IO.Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }

            // save files.
            foreach (pictureModel file in files)
            {
                string fullPath = Path.Combine(id, Path.Combine(filePath, file.name));
                saveImage(file.picture, fullPath);
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

        [HttpPost]
        [Route("updateBasicInfo")]
        public async Task<IActionResult> updateBasicInfo([FromBody]BasicInformationWP basicInfo)
        {

            try
            {
                await _context.UpdateBasicInfo(basicInfo);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

        }

        [HttpPost]
        [Route("updateHistory")]
        public async Task<IActionResult> updateHistory([FromBody]HistoryOfStateChanges[] historyInfo)
        {

            try
            {
                await _context.UpdateHistory(historyInfo);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

        }


        public void uploadAttachments(pictureModel[] mediaForm, long id)
        {

            string folderName = Path.Combine("Resources", "WorkPlansMA");
            string plansDir = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            string WPDir = Path.Combine(plansDir, "WP" + id.ToString());
            Directory.CreateDirectory(WPDir);

            int i;
            for (i = 0; i < mediaForm.Length; i++)
            {
                string fullPath = Path.Combine(WPDir, mediaForm[i].name);
                saveImage(mediaForm[i].picture, fullPath);
            }

        }

        public void saveImage(string picture, string fullpath)
        {
            //smestam sliku na lokaciju
            byte[] imageBytes = Convert.FromBase64String(picture.Split(',')[1]);
            System.IO.File.WriteAllBytes(fullpath, imageBytes);
        }

    }
}
