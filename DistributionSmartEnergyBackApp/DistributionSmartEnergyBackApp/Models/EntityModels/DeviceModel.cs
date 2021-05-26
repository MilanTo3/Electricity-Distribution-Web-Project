using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.EntityModels
{
    public class DeviceModel
    {
        private string name;
        private string type;
        private long id;
        public long Id
        {
            get
            {
                return id;
            }
            set
            {
                id = value;
            }
        }

        public string Type
        {
            get
            {
                return type;
            }
            set
            {
                type = value;
            }
        }

        public string Name
        {
            get 
            { 
                return name;
            }
            set
            {
                name = type.Substring(0, 3).ToUpper() + id;
            }
        }

        public string Address { get; set; }

        public string Coordinates { get; set; }

        
    }
}
