using TicTacToe.Core.Models;

namespace TicTacToe.Core.Services
{
    public interface IMoveService
    {
        public int GetAIMove(Move move);
    }
}
