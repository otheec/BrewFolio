using BrewFolioServer.Application.Interface;
using BrewFolioServer.Domain.Model;
using BrewFolioServer.Infrastructure.Interface;

namespace BrewFolioServer.Application.Service
{
    public class BreweryTypeService : IBreweryTypeService
    {
        private readonly IBreweryTypeRepository _breweryTypeRepository;

        public BreweryTypeService(IBreweryTypeRepository breweryTypeRepository)
        {
            _breweryTypeRepository = breweryTypeRepository;
        }

        public async Task<IEnumerable<BreweryType>> GetAllBreweryTypesAsync()
        {
            return await _breweryTypeRepository.GetAllAsync();
        }

        public async Task<BreweryType> GetBreweryTypeByIdAsync(int id)
        {
            return await _breweryTypeRepository.GetByIdAsync(id);
        }

        public async Task AddBreweryTypeAsync(BreweryType breweryType)
        {
            await _breweryTypeRepository.AddAsync(breweryType);
        }

        public async Task UpdateBreweryTypeAsync(BreweryType breweryType)
        {
            await _breweryTypeRepository.UpdateAsync(breweryType);
        }

        public async Task DeleteBreweryTypeAsync(int id)
        {
            await _breweryTypeRepository.DeleteAsync(id);
        }

        public async Task<BreweryType> GetBreweryTypeByTypeAsync(string type) 
        {
            return await _breweryTypeRepository.GetByTypeAsync(type);
        }
    }
}
