using BrewFolioServer.Domain.DTO;
using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Application.Interface
{
    public interface IBreweryService
    {
        Task<IEnumerable<BreweryDTO>> GetPaginatedBreweriesAsync(int pageNumber, int pageSize);
        Task<IEnumerable<BreweryDTO>> GetFilteredPaginatedBreweriesAsync(List<int> statusIds, List<int> typeIds, int pageNumber, int pageSize);
        Task<IEnumerable<BreweryDTO>> SearchBreweriesByLongNameAsync(string query, int maxResults = 10);
        Task<int> GetFilteredCountAsync(List<int> statusIds, List<int> typeIds);
        Task<int> GetTotalBreweriesCountAsync();
        Task<IEnumerable<BreweryDTO>> GetAllBreweriesAsync();
        Task<BreweryDTO> GetBreweryByIdAsync(int id);
        Task AddBreweryByIdsAsync(Brewery brewery, int breweryStatusId, int breweryTypeId, List<int> beersIds);
        Task AddBreweryByNamesAsync(Brewery brewery, string breweryStatus, string breweryType);
        Task UpdateBreweryAsync(Brewery brewery);
        //Task DeleteBreweryAsync(int id);
    }
}
