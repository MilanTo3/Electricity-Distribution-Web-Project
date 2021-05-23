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
        public long switchId { get; set; } 
        public string Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }

    }
}
