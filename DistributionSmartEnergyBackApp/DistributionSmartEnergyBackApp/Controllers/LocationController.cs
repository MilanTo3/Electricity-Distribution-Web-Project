using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace DistributionSmartEnergyBackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {

        private readonly ILocation _context;
        public LocationController(ILocation context)
        {
            _context = context;
        }

        // GET: api/Location/id
        [HttpGet("{id}")]
        [Route("GetLocation")]
        public async Task<LocationModel> GetLocation(long id)
        {
            return await _context.GetLocation(id);
        }

        // GET: api/Location/GetLocations
        [HttpGet]
        [Route("GetLocations")]
        public async Task<IEnumerable<LocationModel>> GetLocations()
        { 
             return await _context.GetLocations();
        }

        // POST: api/Location/AddLocation
        [HttpPost]
        [Route("AddLocation")]
        public async Task<IActionResult> AddLocation([FromForm]LocationModel location)
        {
            try
            {
                await _context.AddLocation(location);
                return Ok();

            }
            catch
            {
                return BadRequest();
            }
        }

        // PUT api/Location/
        [HttpPut]
        [Route("Update")]
        public async Task Put([FromBody] LocationModel location)
        {
            try
            {
                await _context.UpdateLocation(location);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while updating a location. [{e.Message}]");
            }
        }


        //DELETE api/Location/Delete/5
        [HttpDelete("Delete/{id}")]
        public async Task DeleteLocation(long id)
        {
            try
            {
                await _context.DeleteLocation(id);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while deleting a location. [{e.Message}]");
            }
        }


    }
}