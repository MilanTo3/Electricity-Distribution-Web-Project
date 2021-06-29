using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DistributionSmartEnergyUserMicroservice.Models.EntityModels;
using DistributionSmartEnergyUserMicroservice.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DistributionSmartEnergyUserMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {

        private readonly ISettings _context;
        public SettingsController(ISettings context)
        {
            _context = context;
        }

        // GET: api/Settings/GetCurrentSettings
        [HttpGet()]
        [Route("GetCurrentSettings")]
        public async Task<SettingsModel> GetCurrentSettings()
        {
             return await _context.GetCurrentSettings();
        }


        // GET: api/Settings/GetDefaultSettings
        [HttpGet()]
        [Route("GetDefaultSettings")]
        public async Task<SettingsModel> GetDefaultSettings()
        {
            return await _context.GetDefaultSettings();
        }

        

        // POST: api/Settings/UpdateSettings
        [HttpPost]
        [Route("UpdateSettings")]
        public async Task<IActionResult> UpdateSettings([FromForm]SettingsModel settings)
        {
            try
            {
                await _context.UpdateCurrentSettings(settings);
                return Ok();

            }
            catch
            {
                return BadRequest("opsie, something broke");
            }
        }


        //DELETE api/Settings/Delete
        [HttpDelete("Delete")]
        public async Task DeleteSettings(int id)
        {
            try
            {
                await _context.DeleteSettings(id);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while deleting settings. [{e.Message}]");
            }
        }

    }
}