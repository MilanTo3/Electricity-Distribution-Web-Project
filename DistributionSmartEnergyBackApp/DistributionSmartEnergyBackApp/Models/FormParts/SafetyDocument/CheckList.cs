using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.FormParts.SafetyDocument
{
    public class CheckList
    {
        [Key]
        public long Id { get; set; }
        public string DocumentId { get; set; } // SD1
        public bool FirstCheck { get; set; }
        public bool SecondCheck { get; set; }
        public bool ThirdCheck { get; set; }
        public bool FourthCheck { get; set; }
    }
}
