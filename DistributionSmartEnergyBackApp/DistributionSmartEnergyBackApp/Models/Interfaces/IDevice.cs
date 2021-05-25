using DistributionSmartEnergyBackApp.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.Interfaces
{
    public interface IDevice
    {
        Task AddDevice(DeviceModel device);
    }
}
