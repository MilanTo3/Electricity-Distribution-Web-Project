using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Services
{
    public class DeviceService : IDevice
    {
        private readonly AuthenticationContext _context;

        public DeviceService(AuthenticationContext context)
        {
            _context = context;
        }
        public async Task AddDevice(DeviceModel device)
        {
            _context.Devices.Add(device);
            await _context.SaveChangesAsync(true);
        }
    }
}
