using BrewFolioServer.Domain.DTO;
using BrewFolioServer.Domain.Model;
using BrewFolioServer.Infrastructure.Data;
using BrewFolioServer.Infrastructure.Interface;
using Microsoft.EntityFrameworkCore;

namespace BrewFolioServer.Infrastructure.Repository
{
    public class BreweryRepository : IBreweryRepository
    {
        private readonly AppDbContext _context;

        public BreweryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Brewery> GetBreweryByIdAsync(int id)
        {
            return await _context.Breweries
                .Include(b => b.Beers)
                .Include(b => b.Type) 
                .Include(b => b.Status)
                .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<IEnumerable<BreweryDTO>> GetPaginatedAsync(int pageNumber, int pageSize)
        {
            return await _context.Breweries
                .OrderBy(b => b.Name) // Adjust ordering as needed
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(brewery => new BreweryDTO
                {
                    Id = brewery.Id,
                    Name = brewery.Name,
                    LongName = brewery.LongName,
                    Type = brewery.Type,
                    Status = brewery.Status,
                    Visited = brewery.Visited,
                    Beers = brewery.Beers.Select(beer => new BeerDTO
                    {
                        Id = beer.Id,
                        Name = beer.Name
                    }).ToList()
                }).ToListAsync();
        }

        public async Task<int> GetTotalCountAsync()
        {
            return await _context.Breweries.CountAsync();
        }

        public async Task<IEnumerable<BreweryDTO>> GetAllAsync()
        {
            return await _context.Breweries
                .Select(brewery => new BreweryDTO
                {
                    Id = brewery.Id,
                    Name = brewery.Name,
                    LongName = brewery.LongName,
                    Type = brewery.Type,
                    Status = brewery.Status,
                    Visited = brewery.Visited,
                    Beers = brewery.Beers.Select(beer => new BeerDTO
                    {
                        Id = beer.Id,
                        Name = beer.Name
                    }).ToList()
                }).ToListAsync();
        }

        public async Task<BreweryDTO> GetByIdAsync(int id)
        {
            var brewery = await _context.Breweries
                .Include(b => b.Type)
                .Include(b => b.Status)
                .Include(b => b.Beers)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (brewery == null) return null;

            return new BreweryDTO
            {
                Id = brewery.Id,
                Name = brewery.Name,
                LongName = brewery.LongName,
                Type = brewery.Type,
                Status = brewery.Status,
                Visited = brewery.Visited,
                Beers = brewery.Beers.Select(beer => new BeerDTO
                {
                    Id = beer.Id,
                    Name = beer.Name
                }).ToList()
            };
        }

        public async Task<Brewery> GetByLongNameAsync(string longName)
        {
            return await _context.Breweries.Include(b => b.Beers).FirstOrDefaultAsync(b => b.LongName == longName);
        }

        public async Task AddAsync(Brewery brewery)
        {
            _context.Breweries.Add(brewery);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Brewery brewery)
        {
            // Load the existing brewery to update
            var existingBrewery = await _context.Breweries.FindAsync(brewery.Id);
            if (existingBrewery == null)
            {
                throw new ArgumentException("Brewery not found.");
            }

            // Update the existing brewery with the new values
            _context.Entry(existingBrewery).CurrentValues.SetValues(brewery);

            // If there's a more complex logic for handling related entities like Beers,
            // it should be handled here.

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var brewery = await _context.Breweries.FindAsync(id);
            if (brewery != null)
            {
                _context.Breweries.Remove(brewery);
                await _context.SaveChangesAsync();
            }
        }
    }

}
