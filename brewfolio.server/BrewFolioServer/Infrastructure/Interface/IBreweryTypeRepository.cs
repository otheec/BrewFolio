using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Infrastructure.Interface
{
    public interface IBreweryTypeRepository
    {
        Task<IEnumerable<BreweryType>> GetAllAsync();
        Task<BreweryType> GetByIdAsync(int id);
        Task AddAsync(BreweryType breweryType);
        Task UpdateAsync(BreweryType breweryType);
        Task DeleteAsync(int id);
        Task<BreweryType> GetByTypeAsync(string  type);
    }
}
