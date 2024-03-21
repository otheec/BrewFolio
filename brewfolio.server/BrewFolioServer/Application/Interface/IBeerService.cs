using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Application.Interface
{
    public interface IBeerService
    {
        Task<IEnumerable<Beer>> GetPaginatedBeersAsync(int pageNumber, int pageSize);
        Task<int> GetTotalBeersCountAsync();
        Task<IEnumerable<Beer>> GetAllBeersAsync();
        Task<Beer> GetBeerByIdAsync(int id);
        //Task AddBeerAsync(Beer beer, int breweryId);
        Task UpdateBeerAsync(Beer beer, int breweryId);
        Task DeleteBeerAsync(int id);
        Task AddBeerAsync(Beer beer, string longName);
        Task<Beer> AddBeerAsync(Beer beerDto, int breweryId);
        Task<Beer> AddBeerByNameAndBreweryIdAsync(string name, int breweryId);
    }
}
