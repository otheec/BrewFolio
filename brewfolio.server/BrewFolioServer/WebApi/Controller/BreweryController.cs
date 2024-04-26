using BrewFolioServer.Application.Interface;
using BrewFolioServer.Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BrewFolioServer.WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class BreweryController : ControllerBase
    {
        private readonly IBreweryService _breweryService;

        public BreweryController(IBreweryService breweryService)
        {
            _breweryService = breweryService;
        }

        [Authorize]
        [HttpGet("paginated")]
        public async Task<IActionResult> GetPaginated(int pageNumber = 1, int pageSize = 50)
        {
            var breweries = await _breweryService.GetPaginatedBreweriesAsync(pageNumber, pageSize);
            if (breweries == null) return NotFound("Breweries not found");

            var totalCount = await _breweryService.GetTotalBreweriesCountAsync();
            return Ok(new { totalCount, breweries });
        }

        [Authorize]
        [HttpGet("filtered")]
        public async Task<IActionResult> GetFilteredPaginated([FromQuery] List<int> statusIds, [FromQuery] List<int> typeIds, int pageNumber = 1, int pageSize = 50)
        {
            var breweries = await _breweryService.GetFilteredPaginatedBreweriesAsync(statusIds, typeIds, pageNumber, pageSize);
            if (breweries == null) return NotFound("Breweries not found");

            var totalCount = await _breweryService.GetFilteredCountAsync(statusIds, typeIds);

            return Ok(new { totalCount, breweries });
        }

        [Authorize]
        [HttpGet("search")]
        public async Task<IActionResult> SearchBreweriesByLongName([FromQuery] string query, int maxResults = 10)
        {
            var breweries = await _breweryService.SearchBreweriesByLongNameAsync(query, maxResults);
            if (breweries == null) return NotFound("Breweries not found");
            return Ok(breweries);
        }

        [Authorize]
        [HttpGet("searchAndFilter")]
        public async Task<IActionResult> GetFilteredAndSearchByLongNameAsync(
            [FromQuery] List<int> statusIds,
            [FromQuery] List<int> typeIds,
            [FromQuery] string? searchQuery = null,
            int pageNumber = 1,
            int pageSize = 50)
        {
            var breweries = await _breweryService.GetFilteredAndSearchByLongNameAsync(statusIds, typeIds, searchQuery, pageNumber, pageSize);
            if (breweries == null) return NotFound("Breweries not found");

            var totalCount = await _breweryService.GetFilteredAndSearchByLongNameCountAsync(statusIds, typeIds, searchQuery);

            return Ok(new { totalCount, breweries });
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Brewery>>> GetAll()
        {
            var breweries = await _breweryService.GetAllBreweriesAsync();
            return Ok(breweries);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Brewery>> Get(int id)
        {
            var brewery = await _breweryService.GetBreweryByIdAsync(id);
            if (brewery == null) return NotFound();
            return Ok(brewery);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Brewery>> Post([FromBody] Brewery brewery)
        {
            List<int> beersIds = brewery.Beers.Select(beer => beer.Id).ToList();
            await _breweryService.AddBreweryByIdsAsync(brewery, brewery.Status.Id, brewery.Type.Id, beersIds);
            return CreatedAtAction(nameof(Get), new { id = brewery.Id }, brewery);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Brewery brewery)
        {
            if (id != brewery.Id) return BadRequest();
            await _breweryService.UpdateBreweryAsync(brewery);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _breweryService.DeleteBreweryAsync(id);
            return NoContent();
        }
    }
}
