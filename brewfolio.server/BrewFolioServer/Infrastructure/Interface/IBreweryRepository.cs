using BrewFolioServer.Domain.DTO;
using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Infrastructure.Interface
{
    public interface IBreweryRepository
    {
        Task<Brewery> GetBreweryByIdAsync(int id);
        Task<IEnumerable<BreweryDTO>> GetPaginatedAsync(int pageNumber, int pageSize);
        Task<IEnumerable<BreweryDTO>> GetFilteredPaginatedAsync(List<int> statusIds, List<int> typeIds, int pageNumber, int pageSize);
        Task<int> GetFilteredCountAsync(List<int> statusIds, List<int> typeIds);
        Task<IEnumerable<BreweryDTO>> SearchBreweriesByLongNameAsync(string query, int maxResults = 10);
        Task<IEnumerable<BreweryDTO>> GetFilteredAndSearchByLongNameAsync(
            List<int> statusIds,
            List<int> typeIds,
            string searchQuery,
            int pageNumber,
            int pageSize);
        Task<int> GetFilteredAndSearchByLongNameCountAsync(
            List<int> statusIds,
            List<int> typeIds,
            string searchQuery);
        Task<int> GetTotalCountAsync();
        Task<IEnumerable<BreweryDTO>> GetAllAsync();
        Task<BreweryDTO> GetByIdAsync(int id);
        Task<Brewery> GetByLongNameAsync(string longName);
        Task AddAsync(Brewery brewery);
        Task UpdateAsync(Brewery brewery);
        Task DeleteAsync(int id);
    }
}
