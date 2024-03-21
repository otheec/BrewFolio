using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Application.Interface
{
    public interface IBreweryService
    {
        Task<IEnumerable<Brewery>> GetPaginatedBreweriesAsync(int pageNumber, int pageSize);
        Task<IEnumerable<Brewery>> GetFilteredPaginatedBreweriesAsync(List<int> statusIds, List<int> typeIds, int pageNumber, int pageSize);
        Task<IEnumerable<Brewery>> SearchBreweriesByLongNameAsync(string query, int maxResults = 10);
        Task<IEnumerable<Brewery>> GetFilteredAndSearchByLongNameAsync(
            List<int> statusIds,
            List<int> typeIds,
            string searchQuery,
            int pageNumber,
            int pageSize);
        Task<int> GetFilteredAndSearchByLongNameCountAsync(
            List<int> statusIds,
            List<int> typeIds,
            string searchQuery);
        Task<int> GetFilteredCountAsync(List<int> statusIds, List<int> typeIds);
        Task<int> GetTotalBreweriesCountAsync();
        Task<IEnumerable<Brewery>> GetAllBreweriesAsync();
        Task<Brewery> GetBreweryByIdAsync(int id);
        Task AddBreweryByIdsAsync(Brewery brewery, int breweryStatusId, int breweryTypeId, List<int> beersIds);
        Task AddBreweryByNamesAsync(Brewery brewery, string breweryStatus, string breweryType);
        Task UpdateBreweryAsync(Brewery brewery);
        Task DeleteBreweryAsync(int id);
    }
}
