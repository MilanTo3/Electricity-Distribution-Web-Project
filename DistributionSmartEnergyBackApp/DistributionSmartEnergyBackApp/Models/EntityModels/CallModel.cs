using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.EntityModels
{
    public class CallModel
    {
        public long Id { get; set; }

        public string Comment { get; set; }

        public string Hazzard { get; set; }

        public string Reason { get; set; }   

        public long LocationId { get; set; }
    }
}
