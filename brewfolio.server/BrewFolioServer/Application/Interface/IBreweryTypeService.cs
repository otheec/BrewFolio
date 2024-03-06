using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Application.Interface
{
    public interface IBreweryTypeService
    {
        Task<IEnumerable<BreweryType>> GetAllBreweryTypesAsync();
        Task<BreweryType> GetBreweryTypeByIdAsync(int id);
        Task AddBreweryTypeAsync(BreweryType breweryType);
        Task UpdateBreweryTypeAsync(BreweryType breweryType);
        Task DeleteBreweryTypeAsync(int id);
        Task<BreweryType> GetBreweryTypeByTypeAsync(string type);
    }
}
