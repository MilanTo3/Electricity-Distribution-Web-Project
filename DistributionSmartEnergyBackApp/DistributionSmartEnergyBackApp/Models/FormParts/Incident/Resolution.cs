using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.FormParts.Incident
{
    public class Resolution
    {
        public long Id { get; set; }
        public string documentId { get; set; }
        public string cause { get; set; }
        public string subcause { get; set; }
        public string constructionType { get; set; }
        public string material { get; set; }

    }
}
