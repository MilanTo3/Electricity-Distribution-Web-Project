﻿using NotificationMicroservice.Models;
using NotificationMicroservice.Models.EntityModels;
using NotificationMicroservice.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace NotificationMicroservice.Services
{
    public class NotificationService : INotification
    {
        private readonly AuthenticationContext _context;
        private readonly ISettings settingsContext;

        public NotificationService(AuthenticationContext context, ISettings settings) {
            _context = context;
            settingsContext = settings;
        }
        public async Task AddNotification(NotificationModel notification) {
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync(true);
        }

        public async Task ClearAllNotifications(string username) {
            var notifications = await _context.Notifications.Where(n => n.Username == username).ToListAsync();

            foreach (NotificationModel n in notifications) {
                _context.Notifications.Remove(n);
            }

            await _context.SaveChangesAsync();
        }

        public async Task DeleteNotification(int id) {
            var notification = await _context.Notifications.FindAsync(id);

            _context.Notifications.Remove(notification);

            await _context.SaveChangesAsync();
        }

        public async Task<NotificationModel> GetNotification(int id) {
            return await _context.Notifications.FindAsync(id);
        }

        public async Task<IEnumerable<NotificationModel>> GetNotifications() {
            return await _context.Notifications.ToListAsync();
        }

        public async Task<IEnumerable<NotificationModel>> GetUnreadNotif(string username) {
            
            var currentSettings = await settingsContext.GetCurrentSettings();
            List<string> approvedNotifications = new List<string>();
            if (currentSettings.ErrorCheck == true)
                approvedNotifications.Add("Error");
            if (currentSettings.InfoCheck == true)
                approvedNotifications.Add("Info");
            if (currentSettings.SuccessCheck == true)
                approvedNotifications.Add("Success");
            if (currentSettings.WarningCheck == true)
                approvedNotifications.Add("Warning");

            return await _context.Notifications.Where(n => (n.Username == username) && (n.Seen == false) && (approvedNotifications.Contains(n.Type))).ToListAsync();
        }

        public async Task<IEnumerable<NotificationModel>> GetUserNotif(string username) {
            var currentSettings = await settingsContext.GetCurrentSettings();
            List<string> approvedNotifications = new List<string>();
            if (currentSettings.ErrorCheck == true)
                approvedNotifications.Add("Error");
            if (currentSettings.InfoCheck == true)
                approvedNotifications.Add("Info");
            if (currentSettings.SuccessCheck == true)
                approvedNotifications.Add("Success");
            if (currentSettings.WarningCheck == true)
                approvedNotifications.Add("Warning");

            return await _context.Notifications.Where(n => (n.Username == username) && (approvedNotifications.Contains(n.Type))).ToListAsync();
        }

        public async Task MarkAsSeen(string username) {
            var notifications = await _context.Notifications.Where(n => n.Username == username).ToListAsync();

            foreach (NotificationModel n in notifications) {
                n.Seen = true;
                _context.Notifications.Update(n);
            }

            await _context.SaveChangesAsync();
        }
    }
}