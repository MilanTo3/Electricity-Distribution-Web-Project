using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.FormParts.SafetyDocument
{
    public class SafetyDocumentViewModel
    {
        public BasicInformationSD infoForm { get; set; }
        public CheckList checkListForm { get;set; }
        public HistoryOfStateChanges[] historyForm { get; set; }
        public pictureModel[] mediaForm { get; set; }
    }
}
