using BrewFolioServer.Application.Interface;
using BrewFolioServer.Domain.DTO;
using BrewFolioServer.Domain.Model;
using BrewFolioServer.Infrastructure.Interface;


namespace BrewFolioServer.Application.Service
{
    public class BreweryService : IBreweryService
    {
        private readonly IBreweryRepository _breweryRepository;
        private readonly IBeerRepository _beerRepository;
        private readonly IBreweryTypeRepository _breweryTypeRepository;
        private readonly IBreweryStatusRepository _breweryStatusRepository;

        public BreweryService(
            IBreweryRepository breweryRepository, 
            IBeerRepository beerRepository, 
            IBreweryTypeRepository breweryTypeRepository, 
            IBreweryStatusRepository breweryStatusRepository
            )
        {
            _breweryRepository = breweryRepository;
            _beerRepository = beerRepository;
            _breweryTypeRepository = breweryTypeRepository;
            _breweryStatusRepository = breweryStatusRepository;
        }

        public async Task<IEnumerable<BreweryDTO>> GetPaginatedBreweriesAsync(int pageNumber, int pageSize)
        {
            return await _breweryRepository.GetPaginatedAsync(pageNumber, pageSize);
        }

        public async Task<IEnumerable<BreweryDTO>> GetFilteredPaginatedBreweriesAsync(List<int> statusIds, List<int> typeIds, int pageNumber, int pageSize)
        {
            return await _breweryRepository.GetFilteredPaginatedAsync(statusIds, typeIds, pageNumber, pageSize);
        }

        public async Task<int> GetFilteredCountAsync(List<int> statusIds, List<int> typeIds)
        {
            return await _breweryRepository.GetFilteredCountAsync(statusIds, typeIds);
        }

        public async Task<IEnumerable<BreweryDTO>> SearchBreweriesByLongNameAsync(string query, int maxResults = 10)
        {
            return await _breweryRepository.SearchBreweriesByLongNameAsync(query, maxResults);
        }

        public async Task<IEnumerable<BreweryDTO>> GetFilteredAndSearchByLongNameAsync(
            List<int> statusIds,
            List<int> typeIds,
            string searchQuery,
            int pageNumber,
            int pageSize)
        {
            return await _breweryRepository.GetFilteredAndSearchByLongNameAsync(statusIds, typeIds, searchQuery, pageNumber, pageSize);
        }

        public async Task<int> GetFilteredAndSearchByLongNameCountAsync(
            List<int> statusIds,
            List<int> typeIds,
            string searchQuery)
        {
            return await _breweryRepository.GetFilteredAndSearchByLongNameCountAsync(statusIds, typeIds, searchQuery);
        }

        public async Task<int> GetTotalBreweriesCountAsync()
        {
            return await _breweryRepository.GetTotalCountAsync();
        }

        public async Task<IEnumerable<BreweryDTO>> GetAllBreweriesAsync()
        {
            return await _breweryRepository.GetAllAsync();
        }

        public async Task<BreweryDTO> GetBreweryByIdAsync(int id)
        {
            return await _breweryRepository.GetByIdAsync(id);
        }

        public async Task AddBreweryByIdsAsync(Brewery brewery, int breweryStatusId, int breweryTypeId, List<int> beersIds)
        {
            var breweryStatus = await _breweryStatusRepository.GetByIdAsync(breweryStatusId);
            var breweryType = await _breweryTypeRepository.GetByIdAsync(breweryTypeId);
            var beers = await _beerRepository.GetBeersByIdsAsync(beersIds);

            if (breweryStatus == null) 
            {
                throw new ArgumentException("Status not found.");
            }

            if (breweryType == null)
            {
                throw new ArgumentException("Type not found.");
            }

            if (beers == null)
            {
                throw new ArgumentException("Beers not found.");
            }

            //TODO - handle number of the beer returned and expected?
            if (beers.Count() < beersIds.Count())
            {
                //TODO notify about not all beers found
            }

            brewery.Status = breweryStatus;
            brewery.Type = breweryType;
            brewery.Beers = beers.ToList();

            await _breweryRepository.AddAsync(brewery);
        }

        public async Task AddBreweryByNamesAsync(Brewery brewery, string status, string type) 
        {
            var breweryStatus = await _breweryStatusRepository.GetByStatusAsync(status);
            var breweryType = await _breweryTypeRepository.GetByTypeAsync(type);

            if (breweryStatus == null)
            {
                throw new ArgumentException("Status not found.");
            }

            if (breweryType == null)
            {
                throw new ArgumentException("Type not found.");
            }

            brewery.Status = breweryStatus;
            brewery.Type = breweryType;

            await _breweryRepository.AddAsync(brewery);
        }

        public async Task UpdateBreweryAsync(Brewery brewery)
        {
            await _breweryRepository.UpdateAsync(brewery);
        }

        /*public async Task DeleteBreweryAsync(int id)
        {
            // Optionally, handle the deletion of associated beers or set their BreweryId to null
            var beers = await _beerRepository.GetAllAsync();
            var beersToUpdate = beers.Where(b => b.Brewery.Id == id).ToList();
            foreach (var beer in beersToUpdate)
            {
                //TODO ????, does it really remove beer.brewery from the list
                beer.Brewery = null; // Or set BreweryId = null, depending on your model
                await _beerRepository.UpdateAsync(beer);
            }

            await _breweryRepository.DeleteAsync(id);
        }*/
    }

}
