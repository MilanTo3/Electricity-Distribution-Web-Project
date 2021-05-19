using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.FormParts.WorkPlan
{
    public class BasicInformationWP
    {
        public long Id { get; set; }
        public string Type { get; set; }
        public string workRequestId { get; set; }
        public string workIncidentId { get; set; }
        public long locationId { get; set; }
        public DateTime startDateTime { get; set; }
        public DateTime endDateTime { get; set; }
        public string crewId { get; set; }
        public string user { get; set; }
        public string Company { get; set; }
        public string phoneNumber { get; set; }
        public DateTime createdDateTime { get; set; }
        public string Purpose { get; set; }
        public string Notes { get; set; }

    }
}
