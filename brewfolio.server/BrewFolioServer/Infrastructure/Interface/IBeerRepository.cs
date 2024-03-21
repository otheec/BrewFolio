using BrewFolioServer.Domain.DTO;
using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Infrastructure.Interface
{
    public interface IBeerRepository
    {
        Task<Beer> GetBeerByIdAsync(int id);
        Task<int> GetTotalCountAsync();
        Task<IEnumerable<Beer>> GetBeersPaginatedAsync(int pageNumber, int pageSize);
        Task<IEnumerable<Beer>> GetAllBeersAsync();
        Task<IEnumerable<Beer>> GetBeersByIdsAsync(IEnumerable<int> beerIds);
        Task AddAsync(Beer beer);
        Task UpdateAsync(Beer beer);
        Task DeleteAsync(int id);
    }
}
