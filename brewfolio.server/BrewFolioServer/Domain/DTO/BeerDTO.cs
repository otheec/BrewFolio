using BrewFolioServer.Domain.Model;

namespace BrewFolioServer.Domain.DTO
{
    public class BeerDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public BreweryDTO Brewery { get; set; }
    }
}
