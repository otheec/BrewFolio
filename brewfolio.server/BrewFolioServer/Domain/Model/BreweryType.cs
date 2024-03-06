namespace BrewFolioServer.Domain.Model
{
    public class BreweryType
    {
        public int Id { get; set; }
        public string Type { get; set; }

        public BreweryType(string type)
        {
            Type = type;
        }
    }
}
