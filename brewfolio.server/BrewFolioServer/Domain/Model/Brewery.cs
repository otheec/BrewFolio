namespace BrewFolioServer.Domain.Model
{
    public class Brewery
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LongName { get; set; }
        public BreweryType Type { get; set; }
        public BreweryStatus Status { get; set; }
        public bool Visited { get; set; }
        public List<Beer> Beers { get; set; } = new List<Beer>();

        public Brewery(int id, string name, string longName, BreweryType type, BreweryStatus status, bool visited, List<Beer> beers)
        {
            Id = id;
            Name = name;
            LongName = longName;
            Type = type;
            Status = status;
            Visited = visited;
            Beers = beers;
        }

        public Brewery()
        {
        }

        public Brewery PrepareForSerialization()
        {
            if (Beers != null)
            {
                foreach (var beer in Beers)
                {
                    beer.Brewery = null;
                }
            }
            return this;
        }
    }
}
