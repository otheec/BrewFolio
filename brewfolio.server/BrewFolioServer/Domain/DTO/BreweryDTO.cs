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

        public BreweryDTO() { }

        public BreweryDTO(
            int id,
            string name, 
            string longName, 
            BreweryType? type, 
            BreweryStatus? status,
            bool visited, 
            List<BeerDTO>? beers)
        {
            Id = id;
            Name = name;
            LongName = longName;
            Type = type;
            Status = status;
            Visited = visited;
            Beers = beers;
        }
    }
}
