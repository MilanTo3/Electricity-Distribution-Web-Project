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
       // [Key]
        public long Id { get; set; }

        //[Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

        //[Column(TypeName = "nvarchar(100)")]
        public string Street { get; set; }

        //[Column(TypeName = "nvarchar(100)")]
        public string Priority { get; set; }

        //[Column]
        public double Longitude { get; set; }

        //[Column]
        public double Latitude { get; set; }
    }
}
