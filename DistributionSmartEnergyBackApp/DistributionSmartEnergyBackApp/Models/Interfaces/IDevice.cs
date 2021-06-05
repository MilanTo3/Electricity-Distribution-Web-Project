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
        Task<DeviceModel> GetDevice(long id);
        Task<IEnumerable<DeviceModel>> GetDevices();

        Task<IEnumerable<DeviceModel>> GetDevicesAtLocation(string address);
    }
}
