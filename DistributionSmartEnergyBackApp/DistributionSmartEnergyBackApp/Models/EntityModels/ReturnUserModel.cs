using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.EntityModels
{
    public class ReturnUserModel
    {

        public string name { get; set; }
        public string lastname { get; set; }
        public string email { get; set; }
        public string role { get; set; }
        public string username { get; set; }
        public string birthday { get; set; }
        public string address { get; set; }

        public ReturnUserModel(string name, string lastname, string email, string role, string username, string birthday, string address) {

            this.name = name;
            this.lastname = lastname;
            this.email = email;
            this.role = role;
            this.username = username;
            this.birthday = birthday;
            this.address = address;

        }

    }
}
