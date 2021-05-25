using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.FormParts.WorkPlan
{
    public class SwitchingInstruction
    {
        [Key]
        public long Id { get; set; }

        public string DocumentId { get; set; }  // WP1

        public string DeviceId { get; set; } // Device Id
        public string Name { get; set; }
        public string Status { get; set; }

    }
}
