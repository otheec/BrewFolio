using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Infrastructure.Interface
{
    public interface IBreweryStatusRepository
    {
        Task<IEnumerable<BreweryStatus>> GetAllAsync();
        Task<BreweryStatus> GetByIdAsync(int id);
        Task AddAsync(BreweryStatus breweryStatus);
        Task UpdateAsync(BreweryStatus breweryStatus);
        Task DeleteAsync(int id);
        Task<BreweryStatus> GetByStatusAsync(string status);
    }
}
