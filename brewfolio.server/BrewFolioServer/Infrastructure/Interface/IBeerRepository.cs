using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Infrastructure.Interface
{
    public interface IBeerRepository
    {
        Task<Beer> GetByIdAsync(int id);
        Task<int> GetTotalCountAsync();
        Task<IEnumerable<Beer>> GetPaginatedAsync(int pageNumber, int pageSize);
        Task<IEnumerable<Beer>> GetAllAsync();
        Task<IEnumerable<Beer>> GetByIdsAsync(IEnumerable<int> beerIds);
        Task AddAsync(Beer beer);
        Task UpdateAsync(Beer beer);
        Task DeleteAsync(int id);
    }
}
