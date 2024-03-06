namespace BrewFolioServer.Domain.Model
{
    public class BreweryStatus
    {
        public int Id { get; set; }
        public string Status { get; set; }

        public BreweryStatus(string status)
        {
            Status = status;
        }
    }
}
