using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DistributionSmartEnergyUserMicroservice.Models;
using DistributionSmartEnergyUserMicroservice.Models.EntityModels;
using DistributionSmartEnergyUserMicroservice.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MailKit.Net.Smtp;
using static DistributionSmartEnergyUserMicroservice.Models.ApplicationUser;

namespace DistributionSmartEnergyUserMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsumerController : ControllerBase
    {
        private readonly IConsumer _context;
        private UserManager<ApplicationUser> _userManager;

        public ConsumerController(UserManager<ApplicationUser> userManager, IConsumer context)
        {
            _userManager = userManager;
            _context = context;
        }
        [HttpPost]
        [Route("addConsumer")]
        public async Task<IActionResult> addConsumer([FromForm]ConsumerModel consumer)
        {

            try
            {
                await _context.AddNewConsumer(consumer);
                      
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/Consumer/GetConsumer?usermame=
        [HttpGet]
        [Route("GetConsumer")]
        public async Task<ConsumerModel> GetConsumer(string username)
        {
            return await _context.GetConsumer(username);
        }
        // GET: api/Consumer/GetConsumers
        [HttpGet]
        [Route("GetConsumers")]
        public async Task<IEnumerable<ConsumerModel>> GetConsumers()
        {
            return await _context.GetConsumers();
        }

        // GET: api/Consumer/UpdateConsumer
        [HttpPost]
        [Route("UpdateConsumer")]
        public async Task<IActionResult> UpdateConsumer([FromForm]ConsumerModel consumer)
        {
            try
            {
                await _context.UpdateConsumer(consumer);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}