using BrewFolioServer.Domain.Model;
using BrewFolioServer.Infrastructure.Data;
using BrewFolioServer.Infrastructure.Interface;
using Microsoft.EntityFrameworkCore;

namespace BrewFolioServer.Infrastructure.Repository
{
    public class BreweryTypeRepository : IBreweryTypeRepository
    {
        private readonly AppDbContext _context;

        public BreweryTypeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BreweryType>> GetAllAsync()
        {
            return await _context.BreweryTypes.ToListAsync();
        }

        public async Task<BreweryType> GetByIdAsync(int id)
        {
            return await _context.BreweryTypes.FindAsync(id);
        }

        public async Task AddAsync(BreweryType breweryType)
        {
            _context.BreweryTypes.Add(breweryType);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(BreweryType breweryType)
        {
            _context.Entry(breweryType).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var breweryType = await _context.BreweryTypes.FindAsync(id);
            if (breweryType != null)
            {
                _context.BreweryTypes.Remove(breweryType);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<BreweryType> GetByTypeAsync(string type) 
        {
            return await _context.BreweryTypes.FirstOrDefaultAsync(bt => bt.Type == type);
        }
    }
}
