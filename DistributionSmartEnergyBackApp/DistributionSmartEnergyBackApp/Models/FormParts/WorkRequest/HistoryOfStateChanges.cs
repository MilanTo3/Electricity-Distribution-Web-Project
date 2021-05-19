using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.FormParts
{
    public class HistoryOfStateChanges {
        [Key]
        public long Id { get; set; }
        public string DocumentId { get; set; }
        public string Name { get; set; }
        public string dateChanged { get; set; }
        public string Details { get; set; }

    }
}
