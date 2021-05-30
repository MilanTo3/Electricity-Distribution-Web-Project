using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.EntityModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.CodeAnalysis.CSharp.Syntax;
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
using static DistributionSmartEnergyBackApp.Models.ApplicationUser;

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

        [HttpPut, DisableRequestSizeLimit]
        [Route("updateProfile")]
        //PUT : /api/ApplicationUser/UpdateProfile
        public async Task<IActionResult> UpdateProfile([FromForm] UserModel userModel)
        {

            try
            {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                var user = await _userManager.FindByIdAsync(userId);

                user.UserName = userModel.UserName;
                user.Name = userModel.Name;
                user.Lastname = userModel.Lastname;
                user.Email = userModel.Email;
                user.Birthday = userModel.Birthday;
                user.Address = userModel.Address;
                user.UserType = (UserTypeEnumeration)Enum.Parse(typeof(UserTypeEnumeration), userModel.UserType);
                user.RegState = ApplicationUser.RegistrationState.Pending;
                user.PhoneNumber = userModel.PhoneNumber;
                var result = await _userManager.UpdateAsync(user);

                if (result.Errors.Any())
                {
                    var test = result.Errors.ToList();
                    return BadRequest("err" + test[0].Description);
                }
                var user1 = await _userManager.FindByIdAsync(userId);

                if (userModel.FilePicture != null)
                {
                    // saveImage(user, userModel.FilePicture); pozove se dispose ili se buni da dve stvari koriste isti kontekst pa je zato kopirana metoda ovde
                                                              //taj problem se javlja kad se menja slika i u isto vreme neka druga polja, nisam htela da menjam metodu
                    
                    
                    var extension = Path.GetExtension(userModel.FilePicture.FileName);
                    string fileName = user.UserName + extension;
                    string folderName = Path.Combine("Resources", "UsersPics");
                    string pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                    user.FilePicture = fileName;
                    //smestam sliku na lokaciju
                    var fullPath = Path.Combine(pathToSave, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        userModel.FilePicture.CopyTo(stream);
                    }

                    await _userManager.UpdateAsync(user);
                }


                return Ok("ok");
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPut]
        [Route("ChangePassword")]
        //PUT : /api/ApplicationUser/ChangePassword
        public async Task<IActionResult> ChangePassword(string oldpass, string newpass)
        {

            try
            {
                return Ok("ok");
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpDelete]
        [Route("DeleteProfile")]
        //DELETE : /api/ApplicationUser/DeleteProfile?username=
        public async Task<IActionResult> DeleteProfile( string username)
        {

            try
            {
                var user =  _userManager.Users.FirstOrDefault(u=> u.UserName == username);


                deleteImage(user);

                var result = await _userManager.DeleteAsync(user);

                if (result.Errors.Any())
                {
                    var test = result.Errors.ToList();
                    return BadRequest("err" + test[0].Description);
                }
             
                return Ok("ok");
            }
            catch (Exception e)
            {
                throw e;
            }


        }

        [HttpPost]
        [Route("Login")]
        // POST: api/<controller>/Login
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel) {
            var user = await _userManager.FindByNameAsync(loginModel.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, loginModel.Password)) {
                IdentityOptions _options = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                    }),
                    Expires = DateTime.UtcNow.AddHours(5), // token expires in 5 hours.
                    //Key min: 16 characters
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                string roletype = user.UserType.ToString();
                string username = user.UserName;
                return Ok(new { token, username, roletype });
            }
            else
                return BadRequest("errUsername or password is incorrect.");
        }

        [HttpPost]
        [Route("approveOrDenyRequest")]
        public async Task<IActionResult> approveOrDenyRequest([FromForm]string username, [FromForm]int op) {

            var user = await _userManager.FindByNameAsync(username);
            if (user != null) {

                if (op == 0) {
                    user.RegState = RegistrationState.Approved;
                }
                else {
                    user.RegState = RegistrationState.Denied;
                }
                await _userManager.UpdateAsync(user);
                return Ok();
            }

            return BadRequest();
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
                UserType = (UserTypeEnumeration)Enum.Parse(typeof(UserTypeEnumeration), model.UserType),
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
                if (model.FilePicture != null) {
                    saveImage(applicationUser, model.FilePicture);
                    await _userManager.UpdateAsync(applicationUser);
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

        }
        public  void deleteImage(ApplicationUser user)
        {

            string folderName = Path.Combine("Resources", "UsersPics");
            string pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            //brisem sliku sa lokacije
            var fullPath = Path.Combine(pathToSave, user.FilePicture);
            try
            {
                // Check if file exists with its full path    
                if (System.IO.File.Exists(fullPath))
                {
                    // If file found, delete it    
                    System.IO.File.Delete(fullPath);
                    Console.WriteLine("File deleted.");
                }
                else Console.WriteLine("File not found");
            }
            catch (IOException ioExp)
            {
                Console.WriteLine(ioExp.Message);
            }
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
        public async Task<ActionResult<IEnumerable<ReturnUserModel>>> getPendingUsers() {

            var pendingUsers = await _userManager.Users.Where(x => x.RegState == ApplicationUser.RegistrationState.Pending).ToListAsync();
            List<ReturnUserModel> returnUsersModelList = new List<ReturnUserModel>();

            foreach (ApplicationUser user in pendingUsers) {
                returnUsersModelList.Add(new ReturnUserModel(user.Name, user.Lastname, user.Email, user.UserType.ToString(), user.UserName, user.Birthday.ToString(), user.Address));
            }

            return returnUsersModelList;
        }

    }
}
