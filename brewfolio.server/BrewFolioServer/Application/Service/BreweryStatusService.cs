using BrewFolioServer.Application.Interface;
using BrewFolioServer.Domain.Model;
using BrewFolioServer.Infrastructure.Interface;

namespace BrewFolioServer.Application.Service
{
    public class BreweryStatusService : IBreweryStatusService
    {
        private readonly IBreweryStatusRepository _breweryStatusRepository;

        public BreweryStatusService(IBreweryStatusRepository breweryStatusRepository)
        {
            _breweryStatusRepository = breweryStatusRepository;
        }

        public async Task<IEnumerable<BreweryStatus>> GetAllBreweryStatusesAsync()
        {
            return await _breweryStatusRepository.GetAllAsync();
        }

        public async Task<BreweryStatus> GetBreweryStatusByIdAsync(int id)
        {
            return await _breweryStatusRepository.GetByIdAsync(id);
        }

        public async Task AddBreweryStatusAsync(BreweryStatus breweryStatus)
        {
            await _breweryStatusRepository.AddAsync(breweryStatus);
        }

        public async Task UpdateBreweryStatusAsync(BreweryStatus breweryStatus)
        {
            await _breweryStatusRepository.UpdateAsync(breweryStatus);
        }

        public async Task DeleteBreweryStatusAsync(int id)
        {
            await _breweryStatusRepository.DeleteAsync(id);
        }

        public async Task<BreweryStatus> GetBreweryStatusByStatusAsync(string status)
        {
            return await _breweryStatusRepository.GetByStatusAsync(status);
        }
    }
}
