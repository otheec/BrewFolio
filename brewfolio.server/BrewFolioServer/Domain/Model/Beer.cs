namespace BrewFolioServer.Domain.Model
{
    public class Beer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Brewery Brewery { get; set; }

        public Beer(string name, Brewery brewery)
        {
            Name = name;
            Brewery = brewery;
        }

        public Beer()
        {
        }

        public Beer PrepareForSerialization()
        {
            if(Brewery != null)
            {
                Brewery.Beers = null;
            }
            return this;
        }
    }
}
