using BrewFolioServer.Application.Interface;
using BrewFolioServer.Application.Service;
using BrewFolioServer.Application.Utility;
using BrewFolioServer.Domain.Model;
using BrewFolioServer.Infrastructure.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BrewFolioServer.WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilityController : ControllerBase
    {
        private readonly IFetcherCSVService _fetcherService;

        public UtilityController(IFetcherCSVService fetcherService)
        {
            _fetcherService = fetcherService;
        }

        [Authorize]
        [HttpPost("upload")]
        public async Task<ActionResult<List<Brewery>>> UploadBreweries(IFormFile file)
        {
            FetcherCSV fetcher = new();
            if (file == null || file.Length == 0)
            {
                return BadRequest("File is empty.");
            }

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                stream.Position = 0;
                using var reader = new StreamReader(stream);
                fetcher.FetchFromCSV(reader);
            }

            await _fetcherService.AddFetchedCSVDataAsync(fetcher.Breweries, fetcher.Beers, fetcher.Types, fetcher.Statuses);

            return Ok();
        }
    }
}
