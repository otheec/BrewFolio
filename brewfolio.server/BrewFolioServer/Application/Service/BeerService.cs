using BrewFolioServer.Application.Interface;
using BrewFolioServer.Domain.DTO;
using BrewFolioServer.Domain.Model;
using BrewFolioServer.Infrastructure.Interface;

namespace BrewFolioServer.Application.Service
{
    public class BeerService : IBeerService
    {
        private readonly IBeerRepository _beerRepository;
        private readonly IBreweryRepository _breweryRepository;

        public BeerService(IBeerRepository beerRepository, IBreweryRepository breweryRepository)
        {
            _beerRepository = beerRepository;
            _breweryRepository = breweryRepository;
        }

        public async Task<IEnumerable<BeerDTO>> GetPaginatedBeersAsync(int pageNumber, int pageSize)
        {
            return await _beerRepository.GetPaginatedAsync(pageNumber, pageSize);
        }

        public async Task<int> GetTotalBeersCountAsync()
        {
            return await _beerRepository.GetTotalCountAsync();
        }

        public async Task<IEnumerable<BeerDTO>> GetAllBeersAsync()
        {
            return await _beerRepository.GetAllAsync();
        }

        public async Task<BeerDTO> GetBeerByIdAsync(int id)
        {
            return await _beerRepository.GetByIdAsync(id);
        }

        public async Task AddBeerAsync(Beer beer, int breweryId)
        {
            var brewery = await _breweryRepository.GetByIdAsync(breweryId);
            if (brewery == null)
            {
                throw new ArgumentException("Brewery not found.");
            }

            beer.Brewery = new Brewery();
            await _beerRepository.AddAsync(beer);
        }

        public async Task<Beer> AddBeerAsync(BeerDTO beerDto, int breweryId)
        {
            var brewery = await _breweryRepository.GetBreweryByIdAsync(breweryId);
            if (brewery == null)
            {
                throw new ArgumentException("Brewery not found.");
            }

            var beer = new Beer
            {
                Name = beerDto.Name,
                Brewery = brewery
            };

            await _beerRepository.AddAsync(beer);
            return beer;
        }

        public async Task<Beer> AddBeerByNameAndBreweryIdAsync(string name, int breweryId)
        {
            var brewery = await _breweryRepository.GetBreweryByIdAsync(breweryId);
            if (brewery == null)
            {
                throw new ArgumentException("Brewery not found.");
            }

            var beer = new Beer
            {
                Name = name,
                Brewery = brewery
            };

            await _beerRepository.AddAsync(beer);
            return beer;
        }


        public async Task AddBeerAsync(Beer beer, string longName)
        {
            var brewery = await _breweryRepository.GetByLongNameAsync(longName);
            if (brewery == null)
            {
                throw new ArgumentException("Brewery not found.");
            }

            beer.Brewery = brewery;
            await _beerRepository.AddAsync(beer);
        }

        /*public async Task UpdateBeerAsync(Beer beer, int breweryId)
        {
            var brewery = await _breweryRepository.GetByIdAsync(breweryId);
            if (brewery == null)
            {
                throw new ArgumentException("Brewery not found.");
            }

            var existingBeer = await _beerRepository.GetByIdAsync(beer.Id);
            if (existingBeer == null)
            {
                throw new ArgumentException("Beer not found.");
            }

            existingBeer.Name = beer.Name;
            existingBeer.Brewery = brewery; // Update the brewery
                                            // Update other fields as necessary

            await _beerRepository.UpdateAsync(existingBeer);
        }*/

        public async Task DeleteBeerAsync(int id)
        {
            await _beerRepository.DeleteAsync(id);
        }
    }
}
