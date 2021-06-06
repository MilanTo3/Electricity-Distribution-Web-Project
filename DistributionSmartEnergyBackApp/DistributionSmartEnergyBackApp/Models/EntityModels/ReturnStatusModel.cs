using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.EntityModels
{
    public class ReturnStatusModel
    {

        public string status { get; set; }
        public string user { get; set; }

        public ReturnStatusModel(string status, string user) {

            this.status = status;
            this.user = user;

        }

    }
}
