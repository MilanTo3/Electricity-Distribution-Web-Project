using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.FormParts;
using DistributionSmartEnergyBackApp.Models.FormParts.WorkPlan;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models
{
    public class AuthenticationContext : IdentityDbContext
    {

        public AuthenticationContext(DbContextOptions options) : base(options) {

        }

        public DbSet<ApplicationUser> applicationUsers { get; set; }

        public DbSet<LocationModel> Locations { get; set; }
        public DbSet<WorkRequestModel> WorkRequests { get; set; }
        public DbSet<BasicInformationWR> BasicInformationsWR { get; set; }
        public DbSet<HistoryOfStateChanges> HistoryChanges { get; set; } // WR-1 WP-1
        public DbSet<TeamModel> DispatchTeams { get; set; }

        public DbSet<WorkPlanModel> WorkPlans { get; set; }

        public DbSet<SwitchingInstruction> SwitchingInstructions { get; set; }

        public DbSet<BasicInformationWP> BasicInformationsWP { get; set; }

        public DbSet<CallModel> Calls { get; set; }

        public DbSet<DeviceModel> Devices { get; set; }

        public DbSet<SettingsModel> Settings { get; set; }
    }
}
