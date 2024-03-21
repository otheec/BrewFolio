using BrewFolioServer.Application.Interface;
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

        public async Task<IEnumerable<Beer>> GetPaginatedBeersAsync(int pageNumber, int pageSize)
        {
            var beers = await _beerRepository.GetPaginatedAsync(pageNumber, pageSize);
            return beers.Select(beer => beer.PrepareForSerialization());
        }

        public async Task<int> GetTotalBeersCountAsync()
        {
            return await _beerRepository.GetTotalCountAsync();
        }

        public async Task<IEnumerable<Beer>> GetAllBeersAsync()
        {
            var beers = await _beerRepository.GetAllAsync();
            return beers.Select(beer => beer.PrepareForSerialization());
        }

        public async Task<Beer> GetBeerByIdAsync(int id)
        {
            var beer = await _beerRepository.GetByIdAsync(id);
            return beer.PrepareForSerialization();

        }

        /*public async Task AddBeerAsync(Beer beer, int breweryId)
        {
            var brewery = await _breweryRepository.GetByIdAsync(breweryId) ?? throw new ArgumentException("Brewery not found.");

            //TODO - patch, new brewery is created, not being set the found one by id
            beer.Brewery = new Brewery();

            await _beerRepository.AddAsync(beer);
        }*/

        public async Task<Beer> AddBeerAsync(Beer beerDto, int breweryId)
        {
            var brewery = await _breweryRepository.GetBreweryByIdAsync(breweryId) ?? throw new ArgumentException("Brewery not found.");
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
            var brewery = await _breweryRepository.GetBreweryByIdAsync(breweryId) ?? throw new ArgumentException("Brewery not found.");
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
            var brewery = await _breweryRepository.GetByLongNameAsync(longName) ?? throw new ArgumentException("Brewery not found.");

            beer.Brewery = brewery;

            await _beerRepository.AddAsync(beer);
        }

        public async Task UpdateBeerAsync(Beer beer, int breweryId)
        {
            var brewery = await _breweryRepository.GetBreweryByIdAsync(breweryId) ?? throw new ArgumentException("Brewery not found.");
            var existingBeer = await _beerRepository.GetByIdAsync(beer.Id) ?? throw new ArgumentException("Beer not found.");

            existingBeer.Name = beer.Name;
            existingBeer.Brewery = brewery;

            await _beerRepository.UpdateAsync(existingBeer);
        }

        public async Task DeleteBeerAsync(int id)
        {
            await _beerRepository.DeleteAsync(id);
        }
    }
}
