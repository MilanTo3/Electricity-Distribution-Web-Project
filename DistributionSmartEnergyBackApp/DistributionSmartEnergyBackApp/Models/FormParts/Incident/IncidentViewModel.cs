using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.FormParts.Incident
{
    public class IncidentViewModel
    {
        public BasicInformationIN infoForm { get; set; }
        public string teamId { get; set; }
        public List<long> callIds { get; set; }
        public List<long> devicesIds { get; set; }
        public pictureModel[] mediaForm { get; set; }
        public Resolution resolutionForm { get; set; }
    }
}
