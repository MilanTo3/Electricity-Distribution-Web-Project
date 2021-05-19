using DistributionSmartEnergyBackApp.Models.FormParts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models
{
    public class WorkRequestModel {

        [Key]
        public long Id {get;set;}

    }
}
