import React, { useState } from "react";
import "./Board.css"
import Cell from "./Cell";
import PlayAgain from "./PlayAgain";

/**
 * Game board for lights out
 * Properties:
 *
 * - nrows: number of rows of board default 5 based on typical game size
 * - ncols: number of cols of board default 5 based on typical game size
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *    default 0.25 (25% chance) because that seems like a reasonable starting point
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

const Board = ({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) => {
    const [board, setBoard] = useState(createBoard());

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
    function createBoard() {
        let initialBoard = [];
        // FINISHED: Create 2D array-of-arrays of true/false values
        initialBoard = Array.from({ length: nrows }, () =>
            Array.from({ length: ncols }, () =>
                Math.random() < chanceLightStartsOn
            )
        );
        return initialBoard;
    }

    function hasWon() {
        // FINISHED: check the board in state to determine whether the player has won. Use Array.every() method twice to check if every cell in every row is false.
        const check = board.every(row => row.every(cell => !cell));
        return check;
    }

    function resetGame() {
        setBoard(createBoard()); // Reset the board to a new random state
    }

    /** flip cell at (y, x) and cells around it */

    function flipCellsAround(coord) {
        setBoard(oldBoard => {
            const [y, x] = coord.split("-").map(Number);

            const flipCell = (y, x, boardCopy) => {
                // if this coord is actually on board, flip it

                if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                    boardCopy[y][x] = !boardCopy[y][x];
                }
            };

            // FINISHED: Make a (deep) copy of the oldBoard by mapping over each row and copying it with the spread operator
            const boardCopy = oldBoard.map(row => [...row]);

            // FINISHED: in the copy, flip this cell and the cells around it and return the copy
            flipCell(y, x, boardCopy); // flip initial cell
            flipCell(y - 1, x, boardCopy); // flip above
            flipCell(y + 1, x, boardCopy); // flip below
            flipCell(y, x - 1, boardCopy); // flip left
            flipCell(y, x + 1, boardCopy); // flip right

            return boardCopy;
        });
    }

    // FINSHED: if the game is won, just show a winning msg & render nothing else ... moved to the return statement below

    // FINISHED: make table board of Cell components with a nested row-major loop
    let lightsOutBoard = [];
    for (let y = 0; y < nrows; y++) {
        let row = [];
        for (let x = 0; x < ncols; x++) {
            let coord = `${y}-${x}`;
            row.push(
                <Cell
                    key={coord}
                    isLit={board[y][x]}
                    flipCellsAroundMe={() => flipCellsAround(coord)}
                />
            );
        }
        lightsOutBoard.push(<tr key={y}>{row}</tr>);
    }

    // REFACTORED to use a ternary operator in the return statement
    return (
        <div>
            {hasWon() ? (
                <div className="Board-win">
                    <h2>You Win!</h2>
                    <PlayAgain resetGame={resetGame} />
                </div>
            ) : (
                <table className="Board">
                    <tbody>{lightsOutBoard}</tbody>
                </table>
            )}
        </div>
    );
}

export default Board;