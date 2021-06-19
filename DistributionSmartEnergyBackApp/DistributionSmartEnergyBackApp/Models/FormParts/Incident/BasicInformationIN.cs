using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.FormParts.Incident
{
    public class BasicInformationIN
    {

        public long Id { get; set; }
        public string DocumentId { get; set; }  // WR1
        public string Status { get; set; }
        public string Type { get; set; }
        public bool emergency { get; set; }
        public bool confirmed { get; set; }
        public DateTime ETA { get; set; }
        public DateTime ATA { get; set; }
        public DateTime incidentTime { get; set; }
        public DateTime ETR { get; set; }
        public int affectedCustoms { get; set; }
        public int callNum { get; set; }
        public int voltage { get; set; }
        public DateTime scheduledTime { get; set; }
        public string dispatcher { get; set; }
        public long teamId { get; set; }

    }
}
