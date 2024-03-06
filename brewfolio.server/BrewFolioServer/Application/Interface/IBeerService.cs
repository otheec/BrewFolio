using BrewFolioServer.Domain.DTO;
using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Application.Interface
{
    public interface IBeerService
    {
        Task<IEnumerable<BeerDTO>> GetAllBeersAsync();
        Task<BeerDTO> GetBeerByIdAsync(int id);
        Task AddBeerAsync(Beer beer, int breweryId);
        //Task UpdateBeerAsync(Beer beer, int breweryId);
        Task DeleteBeerAsync(int id);
        Task AddBeerAsync(Beer beer, string longName);
    }
}
