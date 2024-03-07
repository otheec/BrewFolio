using BrewFolioServer.Domain.DTO;
using BrewFolioServer.Domain.Model;
using BrewFolioServer.Infrastructure.Data;
using BrewFolioServer.Infrastructure.Interface;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace BrewFolioServer.Infrastructure.Repository
{
    public class BeerRepository : IBeerRepository
    {
        private readonly AppDbContext _context;

        public BeerRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetTotalCountAsync()
        {
            return await _context.Beers.CountAsync();
        }

        public async Task<IEnumerable<BeerDTO>> GetPaginatedAsync(int pageNumber, int pageSize)
        {
            return await _context.Beers
                .OrderBy(b => b.Id) // Assuming ordering by Id, adjust as necessary
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(beer => new BeerDTO
                {
                    Id = beer.Id,
                    Name = beer.Name,
                    Brewery = beer.Brewery == null ? null : new BreweryDTO
                    {
                        Id = beer.Brewery.Id,
                        Name = beer.Brewery.Name,
                        LongName = beer.Brewery.LongName,
                        Type = null,
                        Status = null,
                        Visited = beer.Brewery.Visited,
                        Beers = null
                    }
                }).ToListAsync();
        }

        public async Task<IEnumerable<BeerDTO>> GetAllAsync()
        {
            return await _context.Beers
                .Select(beer => new BeerDTO
                {
                    Id = beer.Id,
                    Name = beer.Name,
                    Brewery = beer.Brewery == null ? null : new BreweryDTO
                    {
                        Id = beer.Brewery.Id,
                        Name = beer.Brewery.Name,
                        LongName = beer.Brewery.LongName,
                        Type = null,
                        Status = null,
                        Visited = beer.Brewery.Visited,
                        Beers = null
                    }
                }).ToListAsync();
        }

        public async Task<BeerDTO> GetByIdAsync(int id)
        {
            var beer = await _context.Beers
                .Where(b => b.Id == id)
                .Select(b => new BeerDTO
                {
                    Id = b.Id,
                    Name = b.Name,
                    Brewery = b.Brewery == null ? null : new BreweryDTO
                    {
                        Id = b.Brewery.Id,
                        Name = b.Brewery.Name,
                        LongName = b.Brewery.LongName,
                        Type = null,
                        Status = null,
                        Visited = b.Brewery.Visited,
                        Beers = null
                    }
                }).SingleOrDefaultAsync();

            return beer;
        }

        public async Task<IEnumerable<Beer>> GetByIdsAsync(IEnumerable<int> beerIds)
        {
            return await _context.Beers
                .Include(b => b.Brewery)
                .Where(b => beerIds.Contains(b.Id))
                .ToListAsync();
        }

        public async Task AddAsync(Beer beer)
        {
            _context.Beers.Add(beer);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Beer beer)
        {
            var existingBeer = await _context.Beers.FindAsync(beer.Id);
            if (existingBeer == null)
            {
                throw new ArgumentException("Beer not found.");
            }

            _context.Entry(existingBeer).CurrentValues.SetValues(beer);
            // If the Brewery is supposed to be updated through the repository, ensure to attach the new Brewery entity
            // or update the BreweryId directly if it's stored as a foreign key.
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var beer = await _context.Beers.FindAsync(id);
            if (beer != null)
            {
                _context.Beers.Remove(beer);
                await _context.SaveChangesAsync();
            }
        }
    }

}
