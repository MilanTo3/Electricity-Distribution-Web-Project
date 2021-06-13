using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.FormParts.SafetyDocument
{
    public class BasicInformationSD
    {

        public string type { get; set; }
        public string documentId { get; set; }
        public string user { get; set; }
        public long crew { get; set; }
        public string details { get; set; }
        public string notes { get; set; }
        public string phoneNumber { get; set; }
        public DateTime dateCreated { get; set; }

    }
}
