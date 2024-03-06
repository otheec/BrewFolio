using BrewFolioServer.Application.Interface;
using BrewFolioServer.Domain.Model;
using BrewFolioServer.Infrastructure.Interface;

namespace BrewFolioServer.Application.Service
{
    public class FetcherCSVService : IFetcherCSVService
    {
        private readonly IBreweryService _breweryService;
        private readonly IBeerService _beerService;
        private readonly IBreweryTypeRepository _breweryTypeRepository;
        private readonly IBreweryStatusRepository _breweryStatusRepository;

        public FetcherCSVService(
            IBreweryService breweryService, 
            IBeerService beerService, 
            IBreweryTypeRepository breweryTypeRepository, 
            IBreweryStatusRepository breweryStatusRepository
            )
        {
            _breweryService = breweryService;
            _beerService = beerService;
            _breweryTypeRepository = breweryTypeRepository;
            _breweryStatusRepository = breweryStatusRepository;
        }

        public async Task AddFetchedCSVDataAsync(
                    List<Brewery> breweries,
                    List<Beer> beers,
                    List<BreweryType> breweryTypes,
                    List<BreweryStatus> breweryStatuses)
        {
            //TODO - return existing brewery or just created brewery to dont access database again while while adding brewery?
            foreach (var type in breweryTypes)
            {
                await _breweryTypeRepository.AddAsync(type);
            }

            foreach (var status in breweryStatuses)
            {
                await _breweryStatusRepository.AddAsync(status);
            }

            foreach (var brewery in breweries)
            {
                await _breweryService.AddBreweryByNamesAsync(brewery, brewery.Status.Status, brewery.Type.Type);
            }
            
            foreach (var beer in beers)
            {
                await _beerService.AddBeerAsync(beer, beer.Brewery.LongName);
            }
        }
    }
}
