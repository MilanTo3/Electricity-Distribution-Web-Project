using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.EntityModels
{
    public class DeviceModel
    {
        public long Id { get; set; }

        public string Type { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Coordinates { get; set; }
    }
}
