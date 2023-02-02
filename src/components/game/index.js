import React, { useState } from 'react'
import './styles.css'
import GameColumn from '../gameColumn'
import { Yellow, Red } from '../player/index'

export default function Game () {
  const initialBoard = {}
  for (let c = 0; c < 7; c++) {
    initialBoard[c] = [null, null, null, null, null, null]
  }
  const [board, setBoard] = useState(initialBoard)
  const [currentPlayer, setCurrentPlayer] = useState(Yellow)
  const [winner, setWinner] = useState(null)
  const [yellowCount, setYellowCount] = useState(0)
  const [redCount, setRedCount] = useState(0)
  const [drawCount, setDrawCount] = useState(0)
  const [isDraw, setIsDraw] = useState(0)

  const checkColumnFour = () => {
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 6 - 3; r++) {
        if (board[c][r] != null &&
          board[c][r] === board[c][r + 1] &&
          board[c][r + 1] === board[c][r + 2] &&
          board[c][r + 2] === board[c][r + 3]) {
          return true
        }
      }
    }
  }

  const checkRowFour = () => {
    for (let c = 0; c < 7 - 3; c++) {
      for (let r = 0; r < 6; r++) {
        if (board[c][r] != null &&
          board[c][r] === board[c + 1][r] &&
          board[c + 1][r] === board[c + 2][r] &&
          board[c + 2][r] === board[c + 3][r]) {
          return true
        }
      }
    }
  }

  const checkDiagonalUpFour = () => {
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 6; r++) {
        if (board[c][r] !== null &&
          board[c][r] === board[c + 1][r + 1] &&
          board[c + 1][r + 1] === board[c + 2][r + 2] &&
          board[c + 2][r + 2] === board[c + 3][r + 3]) {
          return true
        }
      }
    }
  }

  const checkDiagonalDownFour = () => {
    for (let c = 0; c < 7; c++) {
      for (let r = 5; r >= 3; r--) {
        if (board[c][r] != null &&
          board[c][r] === board[c + 1][r - 1] &&
          board[c + 1][r - 1] === board[c + 2][r - 2] &&
          board[c + 2][r - 2] === board[c + 3][r - 3]) {
          return true
        }
      }
    }
  }

  const addToken = (cIndex) => {
    const column = board[cIndex]
    const tokenPos = column.indexOf(null)
    column[tokenPos] = currentPlayer

    if (!winner && tokenPos !== -1) {
      setBoard({
        ...board,
        [cIndex]: column
      })

      setIsDraw(isDraw + 1)
      console.log(isDraw)
      setCurrentPlayer(currentPlayer === Yellow ? Red : Yellow)

      if (isDraw >= 41 && !winner) {
        setDrawCount(drawCount + 1)
        setWinner('Draw')
      }

      if (checkColumnFour() || checkRowFour() || checkDiagonalDownFour() || checkDiagonalUpFour()) {
        setWinner(currentPlayer.props.className)
        if (currentPlayer.props.className === 'yellow') {
          setYellowCount(yellowCount + 1)
          setIsDraw(0)
        } else if (currentPlayer.props.className === 'red') {
          setRedCount(redCount + 1)
          setIsDraw(0)
        }
      }
    }
  }

  const playAgain = () => {
    setBoard(initialBoard)
    setWinner(null)
    setIsDraw(0)
  }

  return (
    <div className='game-container'>
      <span className='gameTitle'>Connect 4 Game</span>
      {!winner && (
        <span className='gameSubTitle'>{currentPlayer.props.className} turn</span>
      )}
      <div className='gameboard'>
        {Object.entries(board).map(([k, col], cIndex) => {
          return <GameColumn col={col} cIndex={cIndex} key={k} onClick={() => addToken(cIndex)} />
        })}
      </div>

      {winner && winner !== 'Draw' && (<h1>{winner} is the winner!</h1>)}

      {winner === 'Draw' && (<h1>{winner}</h1>)}
      <>
        <div className='gameScore'>
          <span className='gameSubTitle'> Yellow : {yellowCount}</span>
          <span className='gameSubTitle'> Red : {redCount}</span>
          <span className='gameSubTitle'> Draw : {drawCount}</span>
        </div>
        <button className='gameButton' onClick={() => playAgain()}>Play Again</button>
      </>
    </div>
  )
}
