using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Domain.DTO
{
    public class BreweryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LongName { get; set; }
        public BreweryType? Type { get; set; }
        public BreweryStatus? Status { get; set; }
        public bool Visited { get; set; }
        public List<BeerDTO>? Beers { get; set; }

        public static BreweryDTO ConvertToBreweryDTO(Brewery brewery)
        {
            return new BreweryDTO
            {
                Id = brewery.Id,
                Name = brewery.Name,
                LongName = brewery.LongName,
                Type = brewery.Type,
                Status = brewery.Status,
                Visited = brewery.Visited,
                Beers = brewery.Beers.Select(beer => new BeerDTO
                {
                    Id = beer.Id,
                    Name = beer.Name
                }).ToList()
            };
        }
    }
}
