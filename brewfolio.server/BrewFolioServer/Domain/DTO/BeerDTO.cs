using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Domain.DTO
{
    public class BeerDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public BreweryDTO Brewery { get; set; }

        public static BeerDTO ConvertToBeerDTO(Beer beer)
        {
            return new BeerDTO
            {
                Id = beer.Id,
                Name = beer.Name,
                Brewery = beer.Brewery == null ? null : new BreweryDTO
                {
                    Id = beer.Brewery.Id,
                    Name = beer.Brewery.Name,
                    LongName = beer.Brewery.LongName,
                    Type = null,
                    Status = null,
                    Visited = beer.Brewery.Visited,
                    Beers = null
                }
            };
        }
    }
}
