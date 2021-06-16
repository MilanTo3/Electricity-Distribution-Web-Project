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
                await _context.Save();
                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        [Route("GetCheckList")]
        public async Task<CheckList> GetCheckListController(string id)
        {
            return await _context.GetCheckList(id);
        }
        
        [HttpGet]
        [Route("GetAllBasicInfo")]

        public async Task<IEnumerable<BasicInformationSD>> GetAllBasicInfoController()
        {
            return await _context.GetAllBasicInfo();
        }

        [HttpGet]
        [Route("GetMyBasicInfo")]
        public async Task<IEnumerable<BasicInformationSD>> GetMyBasicInformationController()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return await _context.GetMyBasicInfo(user.UserName);
        }

        [HttpGet]
        [Route("GetBasicInfo")]
        public async Task<BasicInformationSD> GetBasicInformationController(string id)
        {
            return await _context.GetBasicInfo(id);
        }


    }
}
