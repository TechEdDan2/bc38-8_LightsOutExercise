import React from "react";
import "./PlayAgain.css";

const PlayAgain = ({ resetGame }) => {
    return (
        <button className="play-again" onClick={resetGame}>Play Again</button>
    );
};

export default PlayAgain;