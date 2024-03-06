using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Application.Interface
{
    public interface IFetcherCSVService
    {
        Task AddFetchedCSVDataAsync(
            List<Brewery> breweries, 
            List<Beer>  beers, 
            List<BreweryType> breweryTypes, 
            List<BreweryStatus> breweryStatuses
            );
    }
}
