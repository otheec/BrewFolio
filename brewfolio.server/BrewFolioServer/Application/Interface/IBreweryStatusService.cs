using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Application.Interface
{
    public interface IBreweryStatusService
    {
        Task<IEnumerable<BreweryStatus>> GetAllBreweryStatusesAsync();
        Task<BreweryStatus> GetBreweryStatusByIdAsync(int id);
        Task AddBreweryStatusAsync(BreweryStatus breweryStatus);
        Task UpdateBreweryStatusAsync(BreweryStatus breweryStatus);
        Task DeleteBreweryStatusAsync(int id);
        Task<BreweryStatus> GetBreweryStatusByStatusAsync(string status);
    }
}
