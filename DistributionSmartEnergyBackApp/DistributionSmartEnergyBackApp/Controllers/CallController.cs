using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DistributionSmartEnergyBackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CallController : ControllerBase
    {

        private readonly ICall _context;
        public CallController(ICall context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        [Route("GetCall")]
        public async Task<CallModel> GetCall(long id)
        {
            return await _context.GetCall(id);
        }

        [HttpGet]
        [Route("GetCalls")]
        public async Task<IEnumerable<CallModel>> GetCalls()
        {
            return await _context.GetCalls();
        }

        [HttpPost]
        [Route("AddNewCall")]
        public async Task<IActionResult> AddNewCall([FromForm]CallModel call)
        {
            try
            {
                await _context.AddNewCall(call);
                return Ok();

            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        [Route("Update")]
        public async Task Put(CallModel call)
        {
            try
            {
                await _context.UpdateCall(call);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while updating a call. [{e.Message}]");
            }
        }


        [HttpDelete("Delete/{id}")]
        public async Task DeleteCall(long id)
        {
            try
            {
                await _context.DeleteCall(id);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while deleting a location. [{e.Message}]");
            }
        }
    }
}