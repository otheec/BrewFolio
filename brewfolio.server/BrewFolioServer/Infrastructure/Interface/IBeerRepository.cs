using BrewFolioServer.Domain.DTO;
using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Infrastructure.Interface
{
    public interface IBeerRepository
    {
        Task<IEnumerable<BeerDTO>> GetAllAsync();
        Task<BeerDTO> GetByIdAsync(int id);
        Task<IEnumerable<Beer>> GetByIdsAsync(IEnumerable<int> beerIds);
        Task AddAsync(Beer beer);
        Task UpdateAsync(Beer beer);
        Task DeleteAsync(int id);
    }
}
