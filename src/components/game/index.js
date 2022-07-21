import React, { useState } from "react";
import './styles.css'
import Playground from "../playground";

export default function Game (props) {
  const list = Array.from(Array(7*6).keys())
  const [turn, setTurn] = useState(false)
  const [winner, setWinner] = useState(null)
  const [player1, setPlayer1] = useState([])
  const [player2, setPlayer2] = useState([])
  const [count, setCount] = useState(0)
  const columns = [1,2,3,4,5,6,7]
  const rows = [1,2,3,4,5,6]

  function handleButton(cIndex, rIndex) {
    let newRIndex = 5
    console.log(count)
    if(newRIndex === 5 && count < 7) {
      setCount(count + 1)
    } else if (count >= 7) {
      newRIndex = 4
      setCount(count + 1)
    } else if (count >= 14) {
      newRIndex = 3
      setCount(count + 1)
    } else if (count >= 21) {
      newRIndex = 2
      setCount(count + 1)
    } else if (count >= 28) {
      newRIndex = 1
      setCount(count + 1)
    } else if (count >= 35) {
      newRIndex = 0
      setCount(count + 1)
    } else if (count === 42 ) {
      return setWinner('Draw')
    }
    const newIndex = '' + cIndex + newRIndex
    const numIndex = Number(newIndex)
    console.log('column ', cIndex)
    console.log(numIndex)
    setTurn(!turn)
    if(turn) {
      if(player1.includes(numIndex) || player2.includes(numIndex)) {
        return
      }
      const newList = player1.concat(numIndex)
      setPlayer1(newList)
      console.log(player1)
      if(!winner) {
        if(player1.includes(numIndex)){
          return 'activetrue'
        }
      }
    } else {
      if(player2.includes(numIndex) || player1.includes(numIndex)) {
        return
      }
      const newList = player2.concat(numIndex)
      setPlayer2(newList)
      console.log(player2)
      
    }
  }

  
  function style (cIndex,rIndex) {
    const newIndex = '' + cIndex + rIndex
    const numIndex = Number(newIndex)
    if(!winner) {
      if(player1.includes(numIndex)){
        return 'activetrue'
      } else if (player2.includes(numIndex)) {
        return 'activefalse'
      }
    }
  }
  return (
    <div>
      <Playground list={list}/>
{/*       <table>
        <tbody className="game-container">
        {columns.map((col, cIndex) => (
          <tr className="game-column" key={col}>
            {rows.map((row, rIndex) => (
              <td onClick={() => handleButton(cIndex,rIndex)} className={style(cIndex,rIndex)} key={row}>{row}</td>
            ))}
          </tr>
        ))}
        </tbody>
      </table> */}
    </div>
  )
}