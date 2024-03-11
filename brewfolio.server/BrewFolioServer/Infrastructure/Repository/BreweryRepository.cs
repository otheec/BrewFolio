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

        public async Task<IEnumerable<BreweryDTO>> GetFilteredPaginatedAsync(List<int> statusIds, List<int> typeIds, int pageNumber, int pageSize)
        {
            // Building the query with filters applied
            var query = _context.Breweries.AsQueryable();

            if (statusIds != null && statusIds.Any())
            {
                query = query.Where(b => statusIds.Contains(b.Status.Id));
            }

            if (typeIds != null && typeIds.Any())
            {
                query = query.Where(b => typeIds.Contains(b.Type.Id));
            }

            // Applying pagination
            var paginatedQuery = query
                .OrderBy(b => b.Name) // Adjust ordering as needed
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);

            // Projecting the result to BreweryDTO
            return await paginatedQuery.Select(brewery => new BreweryDTO
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

        public async Task<int> GetFilteredCountAsync(List<int> statusIds, List<int> typeIds)
        {
            var query = _context.Breweries.AsQueryable();

            if (statusIds != null && statusIds.Any())
            {
                query = query.Where(b => statusIds.Contains(b.Status.Id));
            }

            if (typeIds != null && typeIds.Any())
            {
                query = query.Where(b => typeIds.Contains(b.Type.Id));
            }

            // Instead of fetching the breweries, just get the count
            return await query.CountAsync();
        }

        public async Task<IEnumerable<BreweryDTO>> SearchBreweriesByLongNameAsync(string query, int maxResults = 10)
        {
            query = query.ToLower(); // Convert query to lowercase for case-insensitive search

            return await _context.Breweries
                .Where(b => EF.Functions.Like(EF.Functions.Collate(b.LongName.ToLower(), "Latin1_General_CI_AI"), $"%{query}%"))
                .OrderBy(b => b.LongName)
                .Take(maxResults)
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
                })
                .ToListAsync();
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
