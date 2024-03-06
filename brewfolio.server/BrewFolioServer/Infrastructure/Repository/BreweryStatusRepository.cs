using BrewFolioServer.Domain.Model;
using BrewFolioServer.Infrastructure.Data;
using BrewFolioServer.Infrastructure.Interface;
using Microsoft.EntityFrameworkCore;

namespace BrewFolioServer.Infrastructure.Repository
{
    public class BreweryStatusRepository : IBreweryStatusRepository
    {
        private readonly AppDbContext _context;

        public BreweryStatusRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BreweryStatus>> GetAllAsync()
        {
            return await _context.BreweryStatuses.ToListAsync();
        }

        public async Task<BreweryStatus> GetByIdAsync(int id)
        {
            return await _context.BreweryStatuses.FindAsync(id);
        }

        public async Task AddAsync(BreweryStatus breweryStatus)
        {
            _context.BreweryStatuses.Add(breweryStatus);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(BreweryStatus breweryStatus)
        {
            _context.Entry(breweryStatus).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var breweryStatus = await _context.BreweryStatuses.FindAsync(id);
            if (breweryStatus != null)
            {
                _context.BreweryStatuses.Remove(breweryStatus);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<BreweryStatus> GetByStatusAsync(string status)
        {
            return await _context.BreweryStatuses.FirstOrDefaultAsync(bs => bs.Status == status);
        }
    }
}
