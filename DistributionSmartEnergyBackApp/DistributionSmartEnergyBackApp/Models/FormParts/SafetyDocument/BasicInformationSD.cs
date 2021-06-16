using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.FormParts.SafetyDocument
{
    public class BasicInformationSD
    {
        public long Id { get; set; }
        public string Type { get; set; }
        public string DocumentId { get; set; } // SD1
        public string User { get; set; }
        public long Crew { get; set; }
        public string Details { get; set; }
        public string Notes { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateCreated { get; set; }

    }
}
