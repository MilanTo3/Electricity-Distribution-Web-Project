﻿using DistributionSmartEnergyBackApp.Models.FormParts;
using DistributionSmartEnergyBackApp.Models.FormParts.WorkPlan;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.Interfaces
{
    public interface IWorkPlan
    {
        Task<long> AddWorkPlan(WorkPlanViewModel location);

        Task<IEnumerable<BasicInformationWP>> GetAllBasicInfo();
        Task<BasicInformationWP> GetBasicInfo(string id);
        Task<IEnumerable<HistoryOfStateChanges>> GetHistory(string id);

        Task UpdateBasicInfo(BasicInformationWP basicInfo);
        Task UpdateHistory(HistoryOfStateChanges[] changes);

        Task<IEnumerable<SwitchingInstruction>> GetAllSwitchingInstructions();

        Task UpdateSwitchingInstructions(SwitchingInstruction switchingInstructions);

        Task Save();
    }
}