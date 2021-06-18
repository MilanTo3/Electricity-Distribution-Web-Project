using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DistributionSmartEnergyBackApp.Models.FormParts.WorkPlan
{
    public class BasicInformationWP
    {
        public long Id { get; set; }

        public string DocumentId { get; set; }  // WP1
        public string Status { get; set; }
        public string Type { get; set; }
        public string workRequestId { get; set; }
        public string incidentId { get; set; }
        public string Street { get; set; } 
        public long locationId { get; set; } // street dobijamo preko id lokacije

        public long crewId { get; set; }

        public string crewName { get; set; }
        public DateTime startDateTime { get; set; }
        public DateTime endDateTime { get; set; }
    
        public string user { get; set; }
        public string Company { get; set; }
        public string phoneNumber { get; set; }
        public DateTime createdDateTime { get; set; }
        public string Purpose { get; set; }
        public string Notes { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }

    }
}
