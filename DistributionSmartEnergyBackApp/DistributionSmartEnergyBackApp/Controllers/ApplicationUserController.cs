using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.EntityModels;
using MailKit.Net.Smtp;
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
using MimeKit;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static DistributionSmartEnergyBackApp.Models.ApplicationUser;
using System.Drawing;
using System.Drawing.Imaging;
using DistributionSmartEnergyBackApp.Hubs;
using Microsoft.AspNetCore.SignalR;
using DistributionSmartEnergyBackApp.Models.Interfaces;

namespace DistributionSmartEnergyBackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {

        private UserManager<ApplicationUser> _userManager;
        private readonly ApplicationSettings _appSettings;
        private  NotificationHub _hubContext;
        private AuthenticationContext _context;
        public ApplicationUserController(UserManager<ApplicationUser> userManager, IOptions<ApplicationSettings> appSettings,
            AuthenticationContext context) {
            _userManager = userManager;
            _appSettings = appSettings.Value;
            _context = context;
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
        [HttpGet]
        [Route("GetUser")]
        //GET : /api/UserProfile
        public async Task<ReturnUserModel> GetUser(string username)
        {
            var user = await _userManager.Users.Where(u => u.UserName == username).FirstOrDefaultAsync();
            ReturnUserModel u = new ReturnUserModel(user.Name, user.Lastname, user.Email, user.UserType.ToString(), user.UserName, user.Birthday.ToString(), user.Address);
            u.phone = user.PhoneNumber;
            return u;
        }
        [HttpPut, DisableRequestSizeLimit]
        [Route("updateProfile")]
        //PUT : /api/ApplicationUser/UpdateProfile
        public async Task<IActionResult> UpdateProfile([FromForm] UserModel userModel) {

            try {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                var user = await _userManager.FindByIdAsync(userId);

                user.UserName = userModel.UserName;
                user.Name = userModel.Name;
                user.Lastname = userModel.Lastname;
                user.Email = userModel.Email;
                user.Birthday = userModel.Birthday;
                user.Address = userModel.Address; 
                // izmesteno u ChangeRole
               // user.UserType = (UserTypeEnumeration)Enum.Parse(typeof(UserTypeEnumeration), userModel.UserType);
               // user.RegState = ApplicationUser.RegistrationState.Pending;
                user.PhoneNumber = userModel.PhoneNumber;
                var result = await _userManager.UpdateAsync(user);
                
                if (result.Errors.Any()) {
                    var test = result.Errors.ToList();
                    return BadRequest("err" + test[0].Description);
                }
                var user1 = await _userManager.FindByIdAsync(userId);

                if (userModel.FilePicture != null) {
                    // saveImage(user, userModel.FilePicture); pozove se dispose ili se buni da dve stvari koriste isti kontekst pa je zato kopirana metoda ovde
                    //taj problem se javlja kad se menja slika i u isto vreme neka druga polja, nisam htela da menjam metodu


                    var extension = Path.GetExtension(userModel.FilePicture.FileName);
                    string fileName = user.UserName + extension;
                    string folderName = Path.Combine("Resources", "UsersPics");
                    string pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                    user.FilePicture = fileName;
                    //smestam sliku na lokaciju
                    var fullPath = Path.Combine(pathToSave, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create)) {
                        userModel.FilePicture.CopyTo(stream);
                    }

                    await _userManager.UpdateAsync(user);
                }


                return Ok("ok");
            }
            catch (Exception e) {
                throw e;
            }
        }

        [HttpPost]
        [Route("ChangePassword")]
        //PUT : /api/ApplicationUser/ChangePassword
        public async Task<IActionResult> ChangePassword([FromBody] PasswordModel passes) {

            try {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                var user = await _userManager.FindByIdAsync(userId);
                var result = await _userManager.ChangePasswordAsync(user, passes.Old, passes.New);
                if (result.Succeeded)
                    return Ok();
                else
                    return BadRequest("Incorrect password!");
            }
            catch (Exception e) {
                throw e;
            }
        }

        [HttpDelete]
        [Route("DeleteProfile")]
        //DELETE : /api/ApplicationUser/DeleteProfile?username=
        public async Task<IActionResult> DeleteProfile(string username) {

            try {
                var user = _userManager.Users.FirstOrDefault(u => u.UserName == username);


                deleteImage(user);

                var result = await _userManager.DeleteAsync(user);

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
       
        [HttpGet]
        [Route("GetRoleRequests")]
        //GET : /api/ApplicationUser/GetAllRequests
        public async Task<ActionResult<IEnumerable<ReturnUserModel>>> GetRoleRequests()
        {

            var pendingUsers = await _userManager.Users.Where(u => (u.RegState == ApplicationUser.RegistrationState.Pending) && (u.UserType != u.RoleRequest)).ToListAsync();

            List<ReturnUserModel> returnUsersModelList = new List<ReturnUserModel>();

            foreach (ApplicationUser user in pendingUsers)
            {
                returnUsersModelList.Add(new ReturnUserModel(user.Name, user.Lastname, user.Email, user.RoleRequest.ToString(), user.UserName, user.Birthday.ToString(), user.Address));
            }

            return returnUsersModelList;
        }

        [HttpGet]
        [Route("ChangeRole")]
        //GET : /api/ApplicationUser/ChangeRole
        public async Task<IActionResult> ChangeRole(string role)
        {
            //moze da menja ako je vec profil odobren &&
            // ako trazi drugaciju rolu
            // ako su role (roleRequest i userType) a state je pending znaci da je tek registrovan i ceka odobrenje profila
            // samo ako je approved profil onda moze da trazi promenu profila
            try
            {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                var user = await _userManager.FindByIdAsync(userId);
                var rolereq = (UserTypeEnumeration)Enum.Parse(typeof(UserTypeEnumeration), role);
                if (rolereq != user.UserType && user.RegState==RegistrationState.Approved)
                {
                    user.RoleRequest = rolereq;
                    user.RegState = RegistrationState.Pending;
                }
                else
                {
                    return BadRequest("Wait for your profile to be approved first!");

                }

                var result = await _userManager.UpdateAsync(user);

                if (result.Errors.Any())
                {
                    var test = result.Errors.ToList();
                    return BadRequest(test[0].Description);
                }
                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        [HttpPost]
        [Route("ApproveOrDenyRole")]
        public async Task<IActionResult> ApproveOrDenyRole([FromForm] string username, [FromForm] int op)
        {
           
            var user = await _userManager.FindByNameAsync(username);
            if (user != null)
            {
               
                if (op == 0)
                {
                    user.UserType = user.RoleRequest;
                    user.RegState = RegistrationState.Approved;
                }
                else
                {
                    user.RoleRequest = user.UserType;
                    user.RegState = RegistrationState.Denied;
                }
                await _userManager.UpdateAsync(user);

                NotificationModel notification = new NotificationModel()
                {
                    Username = user.UserName,
                    Type = "Info",
                    Timestamp = DateTime.Now,
                    Seen = false,
                    Content = "Role request has been reviewed."
                };
                _context.Notifications.Add(notification);

                try
                {
                    await _context.SaveChangesAsync();
                    NotificationHub.Notify(notification);
                }
                catch (DbUpdateConcurrencyException)
                {
                    return NotFound();
                }

                try
                {
                    var message = new MimeMessage();
                    message.From.Add(new MailboxAddress("mtomin367@gmail.com"));
                    message.To.Add(new MailboxAddress(user.Email));

                    message.Subject = "Account information about role state.";
                    message.Body = new TextPart("plain")
                    {
                        Text = "Howdy! You role change request has been reviewed. Your role request has been " + user.RegState.ToString() + ".\n"
                    };

                    using (var client321 = new SmtpClient())
                    {
                        client321.Connect("smtp.gmail.com", 587, false);
                        client321.Authenticate("mtomin367@gmail.com", "spoonwithyourhomies");
                        client321.Send(message);
                        client321.Disconnect(true);
                    }

                }
                catch
                {

                }

                return Ok();
            }

            return BadRequest();
        }

        [HttpPost]
        [Route("approveOrDenyRequest")]
        public async Task<IActionResult> approveOrDenyRequest([FromForm] string username, [FromForm] int op) {

            var user = await _userManager.FindByNameAsync(username);
            if (user != null) {

                if (op == 0) {
                    user.RegState = RegistrationState.Approved;
                }
                else {
                    user.RegState = RegistrationState.Denied;
                }
                await _userManager.UpdateAsync(user);

                NotificationModel notification = new NotificationModel()
                {
                    Username = user.UserName,
                    Type = "Info",
                    Timestamp = DateTime.Now,
                    Seen = false,
                    Content = "Profile has been reviewed."
                };
                _context.Notifications.Add(notification);

                try
                {
                    await _context.SaveChangesAsync();
                    NotificationHub.Notify(notification);
                }
                catch (DbUpdateConcurrencyException)
                {
                    return NotFound();
                }


                try {
                    var message = new MimeMessage();
                    message.From.Add(new MailboxAddress("mtomin367@gmail.com"));
                    message.To.Add(new MailboxAddress(user.Email));

                    message.Subject = "Account information about Registration state.";
                    message.Body = new TextPart("plain") {
                        Text = "Howdy! You account registration status has been reviewed. Your account is now " + user.RegState.ToString() + ".\n"
                    };

                    using(var client321 = new SmtpClient()) {
                        client321.Connect("smtp.gmail.com", 587, false);
                        client321.Authenticate("mtomin367@gmail.com", "spoonwithyourhomies");
                        client321.Send(message);
                        client321.Disconnect(true);
                    }

                }
                catch {

                }

                return Ok();
            }

            return BadRequest();
        }

        [HttpPost]
        [Route("registerSocialMedia")]
        public async Task<IActionResult> registerBySocialMedia([FromForm] string fullname, [FromForm] string email, [FromForm] string imageUrl) {

            if (email == null) {
                email = "popunjeno";
            }

            ApplicationUser applicationUser = new ApplicationUser() {

                UserName = fullname.Replace(" ", ""),
                Name = fullname.Split(' ')[0],
                Lastname = fullname.Split(' ')[1],
                Email = email,
                Birthday = new DateTime(1998, 10, 1),
                Address = "address",
                UserType = UserTypeEnumeration.Consumer,
                RoleRequest = UserTypeEnumeration.Consumer,
                TeamId = "none",
                RegState = ApplicationUser.RegistrationState.Pending,
                PhoneNumber = "1233",
                FilePicture = fullname
            };

            try {
                var result = await _userManager.CreateAsync(applicationUser, "password");
                if (result.Errors.Any()) {
                    var test = result.Errors.ToList();
                    return BadRequest("err" + test[0].Description);
                }
                if (imageUrl != null) {

                    using (WebClient webClient = new WebClient()) {
                        byte[] data = webClient.DownloadData(imageUrl);

                        using (MemoryStream mem = new MemoryStream(data)) {
                            using (var yourImage = Image.FromStream(mem)) {
                                // If you want it as Png
                                string folderName = Path.Combine("Resources", "UsersPics");
                                string pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                                yourImage.Save(Path.Combine(pathToSave, fullname.Replace(" ", "")) + ".png", ImageFormat.Png);
                            }
                        }

                    }
                }
                return Ok("ok");
            }
            catch (Exception e) {
                throw e;
            }
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("Register")]
        //Post: localhost:24885/api/ApplicationUser/Register
        public async Task<Object> PostApplicationUser([FromForm] UserModel model) {

            ApplicationUser applicationUser = new ApplicationUser() {

                UserName = model.UserName,
                Name = model.Name,
                Lastname = model.Lastname,
                Email = model.Email,
                Birthday = model.Birthday,
                Address = model.Address,
                UserType = (UserTypeEnumeration)Enum.Parse(typeof(UserTypeEnumeration), model.UserType),
                RoleRequest = (UserTypeEnumeration)Enum.Parse(typeof(UserTypeEnumeration), model.UserType),
                TeamId = model.TeamId,
                RegState = ApplicationUser.RegistrationState.Pending,
                PhoneNumber = model.PhoneNumber
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
        public void deleteImage(ApplicationUser user) {

            string folderName = Path.Combine("Resources", "UsersPics");
            string pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            //brisem sliku sa lokacije
            var fullPath = Path.Combine(pathToSave, user.FilePicture);
            try {
                // Check if file exists with its full path    
                if (System.IO.File.Exists(fullPath)) {
                    // If file found, delete it    
                    System.IO.File.Delete(fullPath);
                    Console.WriteLine("File deleted.");
                }
                else Console.WriteLine("File not found");
            }
            catch (IOException ioExp) {
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

            var pendingUsers = await _userManager.Users.Where(x =>( x.RegState == ApplicationUser.RegistrationState.Pending) && (x.UserType==x.RoleRequest)).ToListAsync();
            List<ReturnUserModel> returnUsersModelList = new List<ReturnUserModel>();

            foreach (ApplicationUser user in pendingUsers) {
                returnUsersModelList.Add(new ReturnUserModel(user.Name, user.Lastname, user.Email, user.UserType.ToString(), user.UserName, user.Birthday.ToString(), user.Address));
            }

            return returnUsersModelList;
        }


       

    }
}
