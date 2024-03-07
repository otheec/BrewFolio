using BrewFolioServer.Domain.Model;
using System.Net.Security;
using System.Text.RegularExpressions;

namespace BrewFolioServer.Application.Utility
{
    public class FetcherCSV
    {
        public List<Brewery> Breweries { get; } = [];
        public List<Beer> Beers { get; } = [];
        public List<BreweryType> Types { get; } = [];
        public List<BreweryStatus> Statuses { get; } = [];

        public void FetchFromCSV(StreamReader reader)
        {
            try
            {
                bool firstRow = true;

                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();
                    var values = line.Split(';');

                    if (firstRow)
                    {
                        firstRow = !firstRow;
                        continue;
                    }

                    string type = values[1];
                    string name = values[2];
                    string longName = values[3];
                    string status = values[7];
                    string beersLine = values[13];
                    bool visited = string.Equals(values[18].Trim(), "YES", StringComparison.OrdinalIgnoreCase);

                    Brewery brewery = new();

                    if (!string.IsNullOrEmpty(type))
                    {
                        brewery.Type = AddType(new BreweryType(type));
                    }

                    if (!string.IsNullOrEmpty(name))
                    {
                        brewery.Name = name;
                    }

                    if (!string.IsNullOrEmpty(longName))
                    {
                        brewery.LongName = longName;
                    }

                    if (!string.IsNullOrEmpty(status))
                    {
                        brewery.Status = AddStatus(new BreweryStatus(status));
                    }

                    if (!string.IsNullOrEmpty(beersLine))
                    {
                        string[] splittedBeers = beersLine.Split(", ");
                        foreach (string beer in splittedBeers)
                        {
                            Beers.Add(new Beer(beer, brewery));
                        }
                    }

                    brewery.Visited = visited;

                    if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(longName)) Breweries.Add(brewery);
                }
                Console.WriteLine($"Fetched {Breweries.Count} breweries.");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + "breweries exception");
            }
        }

        public Beer AddBeer(Beer beer)
        {
            var existingBeer = Beers.FirstOrDefault(b => b.Name == beer.Name && b.Brewery.LongName == beer.Brewery.LongName);
            if (existingBeer != null)
            {
                return existingBeer;
            }
            Beers.Add(beer);
            return Beers[^1];
        }

        public BreweryType AddType(BreweryType type)
        {
            var existingType = Types.FirstOrDefault(t => t.Type == type.Type);
            if (existingType != null) 
            {
                return existingType;
            }
            Types.Add(type);
            return Types[^1];
        }

        public BreweryStatus AddStatus(BreweryStatus status)
        {
            var existingStatus = Statuses.FirstOrDefault(s => s.Status == status.Status);
            if (existingStatus != null)
            {
                return existingStatus;
            }
            Statuses.Add(status);
            return Statuses[^1];
        }

        public List<Brewery> GetBreweries() => Breweries;
    }
}
