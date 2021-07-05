using DistributionSmartEnergyNotificationMicroservice.Models.EntityModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyNotificationMicroservice.Models
{
    public class AuthenticationContext : IdentityDbContext
    {

        public AuthenticationContext(DbContextOptions options) : base(options) {
        }
        public DbSet<SettingsModel> Settings { get; set; }
        public DbSet<NotificationModel> Notifications { get; set; }
    }
}
