using Microsoft.AspNetCore.Mvc;
using TicTacToe.Core.Models;
using TicTacToe.Core.Services;

namespace TicTacToe.Api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MoveController : ControllerBase
	{
		private IMoveService _moveService;

		public MoveController(IMoveService moveService)
        {
			_moveService = moveService;
        }

		[HttpPost("GetAIMove")]
		public ActionResult<int> Post([FromBody] Move move)
		{
			int position = _moveService.GetAIMove(move);

			return position;
		}		
	}
}
