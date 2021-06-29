using DistributionSmartEnergyUserMicroservice.Models.EntityModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyUserMicroservice.Models
{
    public class AuthenticationContext : IdentityDbContext
    {

        public AuthenticationContext(DbContextOptions options) : base(options) {
        }
        public DbSet<ApplicationUser> applicationUsers { get; set; }
        public DbSet<ConsumerModel> Consumers { get; set; }
        public DbSet<TeamModel> DispatchTeams { get; set; }
        public DbSet<SettingsModel> Settings { get; set; }
        public DbSet<NotificationModel> Notifications { get; set; }
    }
}
