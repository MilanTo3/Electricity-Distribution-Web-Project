using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.FormParts.WorkRequest
{
    public class WorkRequestViewModel {

        public BasicInformationWR infoForm { get; set; }
        public HistoryOfStateChanges[] historyForm{ get; set; }
        public pictureModel[] mediaForm { get; set; }
    }
}
