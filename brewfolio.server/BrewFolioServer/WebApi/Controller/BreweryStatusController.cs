using BrewFolioServer.Application.Interface;
using BrewFolioServer.Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BrewFolioServer.WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class BreweryStatusController : ControllerBase
    {
        private readonly IBreweryStatusService _breweryStatusService;

        public BreweryStatusController(IBreweryStatusService breweryStatusService)
        {
            _breweryStatusService = breweryStatusService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BreweryStatus>>> GetAll()
        {
            var breweryStatuses = await _breweryStatusService.GetAllBreweryStatusesAsync();
            return Ok(breweryStatuses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BreweryStatus>> Get(int id)
        {
            var breweryStatus = await _breweryStatusService.GetBreweryStatusByIdAsync(id);
            if (breweryStatus == null) return NotFound();
            return Ok(breweryStatus);
        }

        [HttpPost]
        public async Task<ActionResult<BreweryStatus>> Post([FromBody] BreweryStatus breweryStatus)
        {
            await _breweryStatusService.AddBreweryStatusAsync(breweryStatus);
            return CreatedAtAction(nameof(Get), new { id = breweryStatus.Id }, breweryStatus);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] BreweryStatus breweryStatus)
        {
            if (id != breweryStatus.Id) return BadRequest();
            await _breweryStatusService.UpdateBreweryStatusAsync(breweryStatus);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _breweryStatusService.DeleteBreweryStatusAsync(id);
            return NoContent();
        }
    }
}
