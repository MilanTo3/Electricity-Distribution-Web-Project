using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models
{
    public class LocationModel
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string Street { get; set; }

        public string Priority { get; set; }

        public double Longitude { get; set; }

        public double Latitude { get; set; }
    }
}
