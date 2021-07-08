﻿using NotificationMicroservice.Models.EntityModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Models
{
    public class AuthenticationContext : DbContext
    {

        public AuthenticationContext(DbContextOptions options) : base(options) {
        }
        public DbSet<SettingsModel> Settings { get; set; }
        public DbSet<NotificationModel> Notifications { get; set; }
    }
}
