using DistributionSmartEnergyNotificationMicroservice.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyNotificationMicroservice.Models.Interfaces
{
    public interface ISettings
    {

        Task<SettingsModel> GetCurrentSettings(); // bice 2 reda u tabeli, cuvam prvo default settings koji se nikad ne menja
        Task AddSettings(SettingsModel settings); // sledeci red ce biti current settings, na pocetku kao i default, posle se menj

        Task DeleteSettings(int id);

        Task UpdateCurrentSettings(SettingsModel settings);

        Task<SettingsModel> GetDefaultSettings();

    }
}
