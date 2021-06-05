using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.EntityModels
{
    public class SettingsModel
    {
        public int Id { get; set; }
        public bool InfoCheck { get; set; }
        public bool WarningCheck { get; set; }
        public bool SuccessCheck { get; set; }
        public bool ErrorCheck { get; set; }
        public bool MandatoryCheck { get; set; }
        public bool ResetCheck { get; set; }

        public string IconCall { get; set; }
        public string IconCrew { get; set; }
        public string IconIncident { get; set; } 
    }
}
