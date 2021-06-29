using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyUserMicroservice.Models.EntityModels
{
    public class TeamMemberModel
    {

        public string username { get; set; }
        public string name { get; set; }
        public string lastname { get; set; }
        public string picture { get; set; }

        public TeamMemberModel(string username, string name, string lastname, string picture) {

            this.username = username;
            this.name = name;
            this.lastname = lastname;
            this.picture = picture;

        }

    }
}
