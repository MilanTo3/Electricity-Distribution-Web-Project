using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models
{
    public class TeamModel
    {

        public long Id { get; set; }
        public string Name { get; set; }
        public string incidentId { get; set; }
        public DateTime dateCreated { get; set; }

        public TeamModel(string name) {

            Name = name;
            dateCreated = DateTime.Now;

        }

    }
}
