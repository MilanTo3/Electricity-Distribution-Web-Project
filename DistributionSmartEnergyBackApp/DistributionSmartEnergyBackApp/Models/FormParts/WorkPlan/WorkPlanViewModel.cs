using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.FormParts.WorkPlan
{
    public class WorkPlanViewModel
    {
        public BasicInformationWP basicInformationForm { get; set; }
        public HistoryOfStateChanges[] historyForm { get; set; }
        public List<SwitchingInstruction> switchingInstructionsForm { get; set; }
        public pictureModel[] mediaForm { get; set; }

    }
}
