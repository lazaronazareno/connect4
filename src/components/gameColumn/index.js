import React from "react";
import './styles.css'

const GameColumn = ({col, cIndex, onClick}) => {
  return (
    <div className="game-column" key={cIndex} onClick={onClick}>
      {col.map((cell, cellIndex) => {
        return <span className="cell" key={cellIndex}>{cell}</span>
      })}
    </div>
  )
}

export default GameColumn