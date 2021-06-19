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
        private string address;
        private long longitude;
        private long latitude;
        public string documentId { get; set; }

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
                name = value;
            }
        }

        public string Address
        {
            get
            {
                return address;
            }
            set
            {
                address = value;
            }
        }

        public long Longitude
        {
            get
            {
                return longitude;
            }
            set
            {
                longitude = value;
            }

        }

        public long Latitude
        {
            get
            {
                return latitude;
            }
            set
            {
                latitude = value;
            }
        }

        
    }
}
