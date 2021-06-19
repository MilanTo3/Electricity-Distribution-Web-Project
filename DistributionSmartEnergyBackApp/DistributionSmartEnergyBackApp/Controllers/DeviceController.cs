using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Math.EC;
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
            catch(Exception e)
            {
                throw  e;
            }
            
        }

        // GET: api/Device/GetDevice
        [HttpGet]
        [Route("GetDevice")]
        public async Task<DeviceModel> GetDevice(long id)
        {
           
            return await _context.GetDevice(id);

        }
        // GET: api/Device/GetDevices
        [HttpGet]
        [Route("GetDevices")]
        public async Task<IEnumerable<DeviceModel>> GetDevices()
        {
           return  await _context.GetDevices();       
        }
        // GET: api/Device/GetDevicesAtLocation
        [HttpGet]
        [Route("GetDevicesAtLocation")]
        public async Task<IEnumerable<DeviceModel>> GetDevicesAtLocation(string location)
        {
           
            return await _context.GetDevicesAtLocation(location);
           

        }

        [HttpPost]
        [Route("DeleteDevice")]
        
        public async Task DeleteDevice([FromBody] long id)
        {
            try
            {
                await _context.DeleteDevice(id);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while deleting a device. [{e.Message}]");
            }
        }

    }
}
