using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Services
{
    public class SettingsService : ISettings
    {
        private readonly AuthenticationContext _context;

        public SettingsService(AuthenticationContext context)
        {
            _context = context;
          
        }
        public async Task AddSettings(SettingsModel settings) // just once add default settings
        {
           
            _context.Settings.Add(settings);
            await _context.SaveChangesAsync(true);
        }

        public async Task DeleteSettings(int id)
        {
            var settings = await _context.Settings.FindAsync(id);

            _context.Settings.Remove(settings);

            await _context.SaveChangesAsync();
        }

        public async Task<SettingsModel> GetCurrentSettings()
        {
            List<SettingsModel> all = await _context.Settings.ToListAsync();
            if (all.Count < 2)
            {
                setDefaultSettings();
                await _context.SaveChangesAsync();

            }
            var current =  await _context.Settings.FindAsync(all[1].Id); //id ne mora uvek da bude 1 ili 2, kako se ubacuje i brise baza nastavlja
            return current;
        }

        public async void setDefaultSettings() // da ne mora rucno da se postavlja 
        {
            SettingsModel defaultSettings = new SettingsModel();
            defaultSettings.InfoCheck = true;
            defaultSettings.WarningCheck = true;
            defaultSettings.ErrorCheck = true;
            defaultSettings.SuccessCheck = true;
            defaultSettings.ResetCheck = false;
            defaultSettings.MandatoryCheck = false;
            defaultSettings.IconCall = "data:image/png;base64,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";
            defaultSettings.IconCrew = "data:image/png;base64,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";
            defaultSettings.IconIncident = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEiElEQVR4nO2bX4gVVRzHP/e6mq7ZloZlRYJiuaVkFBShoJVBCxnkg0H1UJiKBokZ1EMJ9VCQQYaGa1gP/aEeUjIoqEBFHxQLqi2EjMLQVvrDair9c3d6+P1mZ/Yy996ZM785s+veDxzYPed7fvM9586dc+acc6FFixYtymEssF/T2JK9lMJaIND0eMlevHMp0EfUAX2aN2p4DWn4J5oCYEupjjwyF+gHzgGdwHX6dz8wp0RfXqgAnyOf+KZY/qua95lqzlvuRRr6BzA5lj9Z8wJgSQm+vHAB8APSyDUJ5Y9p2RHVnnc8iTTwW6AtobwN+E416z368sJlwJ9I4xY30N2lmlPAVA++vPE60rBdKbQfqXZboY48ciMwAPwLzEqhv0a1A8C8An15oQLsRT7RjRnqvax19jDCh8WlSEN+BToy1LsY+E3rLi3AlxfGAz8hjVjhUH+l1v1RY404nkYa8BUwxqH+GOBrjfGUoS8vTAPOIOYX5oizSGOc1pgjhjcR4x8YxNqhsd4wiOWFmxHD/wAz6mg6gZ1Ar6admpfEDI01ANxk6rQAKsgSVwC8UEezCPibaDEkTH9pWRIvqmY/w3xYvB8x2gtMSiifAPysmq3AFZq6Ne+oamqZBJxQzTJz10a0EzXu4Tqa27T8G6Aay69qXqCaJB6hcSeVzrOIwS8Y2rg4y1WzPaFsu5Ytr1O3CnypmmdyOS2Aq4CziLn5DXSriG7/WrZq2aoG9Reo5ixwpZPTgngbMfZeE13eDgB4X3VvZfRYGLcSPcWvbqK16IDpeq1Ar10qVeAgYua5FHqLDgB4XrUHqP+88cJDauQYMDGF3qoDLgSOq/7BVE4LwMWEVQdA9s43x+U2tOyArF8/U+IPolsy1LPsABj6AJ6eoV5uXIci6w6A9EOwGXkmI0V0QNpJmAl5p6NFdACkm4abkPeFJFznS1rz36ZlKx3ipnkRy81F5H8lvYPovb6WcB3hdsfYzV7FcxMuSuzDfVGiAzipcdYht2sVeELzTiId7UKaxRhnZmK3LBVOYMI9wFOx//PO6tIsxzlhvTDZBRwmavhhzbPAckEWGLo0fblVUGWKJkumIV7zLskDI3dzIu+mzCArKGZ7qgPYQHRKbAPZ9g6bMR7xHACPugbpQDY1A+A+G18AXEs0ZsfTUS2zwnVjdpCNGmA3dmvxbcAhjbsXefB1EW2hHyL5+IwLFWR7PQBeylp5FnJIoR+4wcgQyGGJ8NNuj+W3a16A7aGIeWQ7nDHILjXTbWgGZJwPgHcSyt7VsgeMrxlOsT9MW2ExxR1UarQx0kPjjRFXphJNtu5sJm5DjrEFyPTUmglEt3o36bfG8rJe49c7ojfIGhV+D4wrwAjIxCpcTardHF1Y0DXHIQcwA2B1PVH8uOo9BRkJ6USm179o2gHMLviaS5C2/Q5ckiTYpIJPGeZb0I5UkMPYAfBKbWEncmT9HHC9X19emYMM7f9Rc8eFP1rYXIIp32xB2vpxmNGlGX3Yv5kNR+I/17kbovF3NKYekLl+2UbKSrtp0aLFqOZ/RfX2FtbCLX8AAAAASUVORK5CYII=";

          //  await AddSettings(defaultSettings); //prvi se ne menja
            await AddSettings(defaultSettings); //drugi je custom
        }
        public async Task<SettingsModel> GetDefaultSettings() 
        {
            List<SettingsModel> all = await _context.Settings.ToListAsync();
            if (all.Count < 2)
            {
                setDefaultSettings();
            }
            var current = await _context.Settings.FindAsync(all[0].Id);
            return current;
        }

        public async Task UpdateCurrentSettings(SettingsModel settings)
        {
            List<SettingsModel> all = await _context.Settings.ToListAsync();
            if (all.Count < 2)
            {
                setDefaultSettings();
            }
            var current = await _context.Settings.FindAsync(all[1].Id);

            if(settings.ResetCheck == false)
            {
                current.IconCall = settings.IconCall;
                current.IconCrew = settings.IconCrew;
                current.IconIncident = settings.IconIncident;
                current.MandatoryCheck = settings.MandatoryCheck;
                current.SuccessCheck = settings.SuccessCheck;
                current.InfoCheck = settings.InfoCheck;
                current.WarningCheck = settings.WarningCheck;
                current.ErrorCheck = settings.ErrorCheck;

            }
            else
            {
                var defaultSetting = await _context.Settings.FindAsync(all[0].Id);
                current.IconCall = defaultSetting.IconCall;
                current.IconCrew = defaultSetting.IconCrew;
                current.IconIncident = defaultSetting.IconIncident;
                current.MandatoryCheck = defaultSetting.MandatoryCheck;
                current.SuccessCheck = defaultSetting.SuccessCheck;
                current.InfoCheck = defaultSetting.InfoCheck;
                current.WarningCheck = defaultSetting.WarningCheck;
                current.ErrorCheck = defaultSetting.ErrorCheck;
            }
            _context.Settings.Update(current);
            await _context.SaveChangesAsync();
        }
    }
}
