using DistributionSmartEnergyBackApp.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {

        private UserManager<ApplicationUser> _userManager;
        private readonly ApplicationSettings _appSettings;

        public ApplicationUserController(UserManager<ApplicationUser> userManager, IOptions<ApplicationSettings> appSettings) {
            _userManager = userManager;
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("getUserProfile")]
        //GET : /api/UserProfile
        public async Task<Object> GetUserProfile() {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return user;
        }

        [HttpPost]
        [Route("Login")]
        // POST: api/<controller>/Login
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel) {
            var user = await _userManager.FindByNameAsync(loginModel.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, loginModel.Password)) {
                var tokenDescriptor = new SecurityTokenDescriptor {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddHours(5), // token expires in 5 hours.
                    //Key min: 16 characters
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
                return BadRequest("errUsername or password is incorrect.");
        }

        [HttpPost]
        [Route("Register")]
        //Post: localhost:24885/api/ApplicationUser/Register
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
                TeamId = model.TeamId,
                RegState = ApplicationUser.RegistrationState.Pending,
                PhoneNumber = model.PhoneNumber
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

        [HttpGet]
        [Route("getPendingUsers")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> getPendingUsers() {

            return await _userManager.Users.Where(x => x.RegState == ApplicationUser.RegistrationState.Pending).ToListAsync();
        }
    }
}
