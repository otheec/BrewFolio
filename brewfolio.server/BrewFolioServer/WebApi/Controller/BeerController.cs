using BrewFolioServer.Application.Interface;
using BrewFolioServer.Application.Service;
using BrewFolioServer.Domain.DTO;
using BrewFolioServer.Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BrewFolioServer.WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeerController : ControllerBase
    {
        private readonly IBeerService _beerService;

        public BeerController(IBeerService beerService)
        {
            _beerService = beerService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Beer>>> GetAll()
        {
            var beers = await _beerService.GetAllBeersAsync();
            return Ok(beers);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Beer>> Get(int id)
        {
            var beer = await _beerService.GetBeerByIdAsync(id);
            if (beer == null) return NotFound();
            return Ok(beer);
        }

        [Authorize]
        [HttpGet("paginated")]
        public async Task<ActionResult> GetPaginatedBeers(int pageNumber = 1, int pageSize = 50)
        {
            var beers = await _beerService.GetPaginatedBeersAsync(pageNumber, pageSize);
            var totalCount = await _beerService.GetTotalBeersCountAsync();

            return Ok(new { totalCount , beers });
        }

        /*[Authorize]
        [HttpPost]
        public async Task<ActionResult<Beer>> Post([FromBody] BeerDTO beerDto, [FromQuery] int breweryId)
        {
            var beer = await _beerService.AddBeerAsync(beerDto, breweryId);
            if (beer == null)
            {
                return NotFound("Brewery not found.");
            }
            return CreatedAtAction(nameof(Get), new { id = beer.Id });
        }*/

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Beer>> Post([FromBody] BeerDTO beerDto, [FromQuery] int breweryId)
        {
            var beer = await _beerService.AddBeerAsync(beerDto, breweryId);
            if (beer == null)
            {
                return NotFound("Brewery not found.");
            }
            //TODO need paralel get method (unauthorized?) to call to get action result - return type modified
            //return CreatedAtAction(nameof(Get), new { id = beer.Id });
            //REST principles
            return Ok(new { id = beer.Id });
        }

        /*[HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Beer beer, [FromQuery] int breweryId)
        {
            if (id != beer.Id) return BadRequest();
            await _beerService.UpdateBeerAsync(beer, breweryId);
            return NoContent();
        }*/

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _beerService.DeleteBeerAsync(id);
            return NoContent();
        }
    }
}
