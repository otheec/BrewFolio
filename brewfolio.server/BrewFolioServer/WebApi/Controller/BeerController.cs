using BrewFolioServer.Application.Interface;
using BrewFolioServer.Domain.Model;
using Microsoft.AspNetCore.Authorization;
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

        [HttpPost]
        public async Task<ActionResult<Beer>> Post([FromBody] Beer beer, [FromQuery] int breweryId)
        {
            await _beerService.AddBeerAsync(beer, breweryId);
            return CreatedAtAction(nameof(Get), new { id = beer.Id }, beer);
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
