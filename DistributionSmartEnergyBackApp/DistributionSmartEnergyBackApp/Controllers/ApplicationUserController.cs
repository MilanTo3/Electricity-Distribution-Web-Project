using DistributionSmartEnergyBackApp.Models;
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
    public class ApplicationUserController : ControllerBase
    {

        private UserManager<ApplicationUser> _userManager;

        public ApplicationUserController(UserManager<ApplicationUser> userManager) {

            _userManager = userManager;

        }

        [HttpPost]
        [Route("Register")]
        //Post: /api/ApplicationUser/Register
        public async Task<Object> PostApplicationUser([FromBody]UserModel model) {

            ApplicationUser applicationUser = new ApplicationUser() {
                UserName = model.UserName,
                Name = model.Name,
                Lastname = model.Lastname,
                Email = model.Email,
                Birthday = model.Birthday,
                Address = model.Address,
                UserType = model.UserType,
                FilePicture = model.FilePicture,
                TeamId = model.TeamId
            };

            try {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                if (result.Errors.Any()) {
                    var test = result.Errors.ToList();
                    return BadRequest("err" + test[0].Description);
                }
                return Ok("ok");
            }
            catch (Exception e) {
                throw e;
            }

        }
    }
}
