using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyUserMicroservice.Models.EntityModels
{
    public class NotificationModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public bool Seen { get; set; }

        public DateTime Timestamp { get; set; }

        public string Content { get; set; }

        public string DocumentId { get; set; } //WR1, WP1..

        public string Type { get; set; } // success, error, info, warning
    }
}
