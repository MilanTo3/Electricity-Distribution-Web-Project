using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.Interfaces;
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
    public class DeviceController : ControllerBase
    {
        private readonly IDevice _context;

        public DeviceController(IDevice context)
        {
            _context = context;
        }

        // POST: api/Device/AddDevice
        [HttpPost]
        [Route("AddDevice")]
        public async Task<IActionResult> AddDevice([FromForm]DeviceModel device)
        {
            try
            {
                await _context.AddDevice(device);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
            
        }
   


    }
}
