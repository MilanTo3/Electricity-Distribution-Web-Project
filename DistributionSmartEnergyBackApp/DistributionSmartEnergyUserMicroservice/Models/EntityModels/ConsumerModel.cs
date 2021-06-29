using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyUserMicroservice.Models.EntityModels
{
    public class ConsumerModel
    {
        [Key]
        public string Username { get; set; }
        public string Type { get; set; }
        public string Priority { get; set; }

    }
}
