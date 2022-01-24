using System;
using System.Collections.Generic;
using TicTacToe.Core.Models;
using TicTacToe.Core.Services;

namespace TicTacToe.Services
{
    public class MoveService : IMoveService
    {
		private readonly List<int[]> Lines = new List<int[]>
			{
				new int[] { 0, 1, 2 },
				new int[] { 3, 4, 5 },
				new int[] { 6, 7, 8 },
				new int[] { 0, 3, 6 },
				new int[] { 1, 4, 7 },
				new int[] { 2, 5, 8 },
				new int[] { 0, 4, 8 },
				new int[] { 2, 4, 6 }
			};

		public int GetAIMove(Move move)
        {
			int position;

			if (CheckWinningMove(move, out position))
			{
				return position;
			}

			if (CheckLosingMove(move, out position))
			{
				return position;
			}

			Random random = new Random();

			while (true)
			{
				int number = random.Next(0, 8);
				if (string.IsNullOrWhiteSpace(move.Squares[number]))
				{
					position = number;
					break;
				}
			}

			return position;
		}

		/// <summary>
		/// Checks whether the AI can make a winning move.
		/// </summary>
		/// <param name="move"></param>
		/// <param name="position"></param>
		/// <returns></returns>
		private bool CheckWinningMove(Move move, out int position)
		{
			string player = move.XIsPlayer ? "O" : "X";
			return CheckMove(move.Squares, player, out position);
		}

		/// <summary>
		/// Checks whether the AI can prevent a losing move.
		/// </summary>
		/// <param name="move"></param>
		/// <param name="position"></param>
		/// <returns></returns>
		private bool CheckLosingMove(Move move, out int position)
		{
			string player = move.XIsPlayer ? "X" : "O";
			return CheckMove(move.Squares, player, out position);
		}

		private bool CheckMove(string[] squares, string player, out int position)
		{
			position = 0;

			foreach (int[] line in Lines)
			{
				if (CheckNumbers(squares, line[0], line[1], line[2], player, out position))
				{
					return true;
				}

				if (CheckNumbers(squares, line[1], line[2], line[0], player, out position))
				{
					return true;
				}

				if (CheckNumbers(squares, line[0], line[2], line[1], player, out position))
				{
					return true;
				}
			}

			return false;
		}

		private bool CheckNumbers(string[] squares, int firstNumber, int secondNumber, int thirdNumber, string player, out int position)
		{
			position = 0;

			if (squares[firstNumber] == player && squares[firstNumber] == squares[secondNumber])
			{
				if (string.IsNullOrWhiteSpace(squares[thirdNumber]))
				{
					position = thirdNumber;
					return true;
				}
			}

			return false;
		}
	}
}
