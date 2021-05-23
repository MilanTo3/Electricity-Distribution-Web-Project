using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models
{
    public class pictureModel
    {
        public string name { get; set; }
        public string picture { get; set; }

        public pictureModel(string name, string picture) {
            this.name = name;
            this.picture = picture;
        }
    }
}
