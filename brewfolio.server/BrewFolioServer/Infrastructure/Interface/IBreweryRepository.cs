using BrewFolioServer.Domain.DTO;
using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Infrastructure.Interface
{
    public interface IBreweryRepository
    {
        Task<Brewery> GetBreweryByIdAsync(int id);
        Task<IEnumerable<BreweryDTO>> GetPaginatedAsync(int pageNumber, int pageSize);
        Task<int> GetTotalCountAsync();
        Task<IEnumerable<BreweryDTO>> GetAllAsync();
        Task<BreweryDTO> GetByIdAsync(int id);
        Task<Brewery> GetByLongNameAsync(string longName);
        Task AddAsync(Brewery brewery);
        Task UpdateAsync(Brewery brewery);
        Task DeleteAsync(int id);
    }
}
