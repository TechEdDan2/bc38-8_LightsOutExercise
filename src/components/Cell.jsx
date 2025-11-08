import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells above and to the left of it
 *
 * - isLit: boolean, is this cell lit? The default is false because cells start unlit
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

const Cell = ({ flipCellsAroundMe, isLit = false }) => {
    const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
    return <td className={classes} onClick={flipCellsAroundMe} />;
}

export default Cell;