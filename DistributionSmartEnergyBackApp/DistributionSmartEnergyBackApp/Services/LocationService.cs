using DistributionSmartEnergyBackApp.Models;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Services
{
    public class LocationService : ILocation
    {
        private readonly AuthenticationContext _context;

        public LocationService(AuthenticationContext context)
        {
            _context = context;
        }
        public async Task AddLocation(LocationModel location)
        {
            _context.Locations.Add(location);
            await _context.SaveChangesAsync(true);
        }

        public async Task DeleteLocation(long id)
        {
            var loc = await _context.Locations.FindAsync(id);

            _context.Locations.Remove(loc);

            await _context.SaveChangesAsync();
        }

        public async Task<LocationModel> GetLocation(long id)
        {
            return await _context.Locations.FindAsync(id);
        }

        public async Task<IEnumerable<LocationModel>> GetLocations()
        {
            return await _context.Locations.ToListAsync();
        }

        public async Task UpdateLocation(LocationModel location)
        {
            var loc = await _context.Locations.FindAsync(location.Id);
            if(loc!= null)
            {
                loc.Latitude = location.Latitude;
                loc.Longitude = location.Longitude;
                loc.Name = location.Name;
                loc.Priority = location.Priority;
                loc.Street = location.Street;
                _context.Locations.Update(loc);
                await _context.SaveChangesAsync();
            }          

        }
    }
}
