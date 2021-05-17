using DistributionSmartEnergyBackApp.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
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
                var role = await _userManager.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddHours(5), // token expires in 5 hours.
                    //Key min: 16 characters
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                string roletype = user.UserType;
                string username = user.UserName;
                return Ok(new { token, username, roletype });
            }
            else
                return BadRequest("errUsername or password is incorrect.");
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("Register")]
        //Post: localhost:24885/api/ApplicationUser/Register
        public async Task<Object> PostApplicationUser([FromForm]UserModel model) {

            ApplicationUser applicationUser = new ApplicationUser() {

                UserName = model.UserName,
                Name = model.Name,
                Lastname = model.Lastname,
                Email = model.Email,
                Birthday = model.Birthday,
                Address = model.Address,
                UserType = model.UserType,
                TeamId = model.TeamId,
                RegState = ApplicationUser.RegistrationState.Pending,
                PhoneNumber = model.PhoneNumber,
            };

            try {
                var result = await _userManager.CreateAsync(applicationUser, HttpContext.Request.Form["Password"]);
                if (result.Errors.Any()) {
                    var test = result.Errors.ToList();
                    return BadRequest("err" + test[0].Description);
                }
                await _userManager.AddToRoleAsync(applicationUser, HttpContext.Request.Form["UserType"]);
                if (model.FilePicture != null) {
                    saveImage(applicationUser, model.FilePicture);
                }
                return Ok("ok");
            }
            catch (Exception e) {
                throw e;
            }

        }

        public void saveImage(ApplicationUser user, IFormFile file) {
            var extension = Path.GetExtension(file.FileName);
            string fileName = user.UserName + extension;
            string folderName = Path.Combine("Resources", "UsersPics");
            string pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            user.FilePicture = fileName;
            //smestam sliku na lokaciju
            var fullPath = Path.Combine(pathToSave, fileName);
            using (var stream = new FileStream(fullPath, FileMode.Create)) {
                file.CopyTo(stream);
            }

            _userManager.UpdateAsync(user);
        }

        [HttpGet, DisableRequestSizeLimit]
        [Route("getProfileImg")]
        public async Task<IActionResult> getProfileImg(string username) {

            ApplicationUser user = _userManager.Users.ToList().Find(x => x.UserName == username);
            if (user == null) {
                return null;
            }

            string folderName = Path.Combine("Resources", "UsersPics");
            string pathToRead = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            var filePath = Path.Combine(pathToRead, user.FilePicture);
            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var memory = new MemoryStream();
            await using (var stream = new FileStream(filePath, FileMode.Open)) {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(filePath), filePath);
        }

        private string GetContentType(string path) {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;

            if (!provider.TryGetContentType(path, out contentType)) {
                contentType = "application/octet-stream";
            }

            return contentType;
        }

        [HttpGet]
        [Route("getPendingUsers")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> getPendingUsers() {

            return await _userManager.Users.Where(x => x.RegState == ApplicationUser.RegistrationState.Pending).ToListAsync();
        }
    }
}
