using BrewFolioServer.Application.Interface;
using BrewFolioServer.Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BrewFolioServer.WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class BreweryTypeController : ControllerBase
    {
        private readonly IBreweryTypeService _breweryTypeService;

        public BreweryTypeController(IBreweryTypeService breweryTypeService)
        {
            _breweryTypeService = breweryTypeService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BreweryType>>> GetAll()
        {
            var breweryTypes = await _breweryTypeService.GetAllBreweryTypesAsync();
            return Ok(breweryTypes);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<BreweryType>> Get(int id)
        {
            var breweryType = await _breweryTypeService.GetBreweryTypeByIdAsync(id);
            if (breweryType == null) return NotFound();
            return Ok(breweryType);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BreweryType>> Post([FromBody] BreweryType breweryType)
        {
            await _breweryTypeService.AddBreweryTypeAsync(breweryType);
            return CreatedAtAction(nameof(Get), new { id = breweryType.Id }, breweryType);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] BreweryType breweryType)
        {
            if (id != breweryType.Id) return BadRequest();
            await _breweryTypeService.UpdateBreweryTypeAsync(breweryType);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _breweryTypeService.DeleteBreweryTypeAsync(id);
            return NoContent();
        }
    }
}
