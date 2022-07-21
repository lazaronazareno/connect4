import React, {useState, useEffect} from 'react'
import './styles.css' 

const solution = [
  [0,1,2,3],[1,2,3,4],[2,3,4,5],[3,4,5,6],[7,8,9,10],[8,9,10,11],[9,10,11,12],[10,11,12,13],[14,15,16,17],[15,16,17,18],
  [16,17,18,19],[17,28,19,20],[21,22,23,24],[22,23,24,25],[23,24,25,26],[24,25,26,27],[28,29,30,31],[29,30,31,32],[30,31,32,33],[31,32,33,34],
  [35,36,37,38],[36,37,38,39],[37,38,39,40],[38,39,40,41],
  [0,7,14,21],[7,24,21,28],[14,21,28,35], [1,8,15,22], [8,15,22,29], [15,22,29,36],  [2,9,16,23],[9,16,23,30],[16,23,30,37],
  [3,10,17,24],[10,17,24,31],[17,24,31,38],[4,11,18,25],[11,18,15,32],[18,25,32,39],[5,12,19,26], [12,19,26,33],[19,26,33,40],
  [6,13,20,27],[13,20,27,34],[20,27,34,41],
  [14,22,30,38],[7,15,23,31],[15,23,31,39],[0,8,16,24],[8,16,24,32],[16,24,32,40],[1,9,17,25],[9,17,25,33],[17,25,33,41],[2,10,18,26],
  [10,18,26,34],[3,11,19,27],
  [3,9,15,21],[4,10,16,22],[10,16,22,28], [5,11,17,23],[11,17,23,29],[17,23,29,35],[6,12,18,24],[12,18,24,30],[18,24,30,36],
  [13,19,25,31],[19,25,31,37],[20,26,32,38]
]

const columns = [
  [0,7,14,21,28,35],[1,8,15,22,29,36],[2,9,16,23,30,37],[3,10,17,24,31,38],[4,11,18,25,32,39],[5,12,19,26,33,40],[6,13,20,27,34,41]
]

const rows = [
  [0,1,2,3,4,5,6],[7,8,9,10,11,12,13],[14,15,16,17,18,19,20],[21,22,23,24,25,26,27],[28,29,30,31,32,33,34],[35,36,37,38,39,40,41]
]

//solution === 4 numeros consecutivos o 4 numeros de a 7, o 4 numeros de a 8 o 4 numeros de a 6 

export default function Playground (props) {
  const [turn, setTurn] = useState(false)
  const [winner, setWinner] = useState(null)
  const [player1, setPlayer1] = useState([])
  const [player2, setPlayer2] = useState([])
  const [plays, setPlays] = useState([])

/*   function findNextIncreased(array, increasedBy) {
    let count = 0
    if(array.length > 3) {
      console.log(array)
      array.sort(function(a, b) { return a - b })
      console.log(array)
      for (let i = 0; i < array.length; i++) {
        if (array[i] + increasedBy === array[i + 1])
        count ++
      }
      if(count >= 3){
        return true
      }
    }
    return false
  } */

  function handleButton(index) {
    console.log(index)
    if(index === 35 || index === 36 || index === 37 || index === 38 || index === 39 || index === 40 || index === 41){
      const newPlays = plays.concat(index)
      setPlays(newPlays)
      console.log(index - 7)
    } else {
      if(plays.includes(index)) {
        console.log(index + 7)
      }
    }
    if(turn) {
      if(player1.includes(index) || player2.includes(index)) {
        return
      }
      const newList = player1.concat(index)
      setPlayer1(newList)
      setTurn(!turn)
    } else {
      if(player1.includes(index) || player2.includes(index)) {
        return
      }
      const newList = player2.concat(index)
      setPlayer2(newList)
      setTurn(!turn)
    }
  }

  function style (index) {
    if(!winner) {
      if(player1.includes(index)){
        return 'activetrue'
      } else if (player2.includes(index)) {
        return 'activefalse'
      }
    }
  }

  function again () {
    setPlayer1([])
    setPlayer2([])
    setWinner(null)
    setTurn(!turn)
  }

  useEffect(() => {
     solution.map(sol => {
      const checker = (arr, target) => target.every(v => arr.includes(v));

      if(checker(player1, sol)){
        setWinner('player1 wins')
      } else if(checker(player2, sol)){
        setWinner('player2 wins')
      }
    }) 
/*     if(findNextIncreased(player1,1) || findNextIncreased(player1,6) || findNextIncreased(player1,7) || findNextIncreased(player1,8)) {
      setWinner('player1 wins')
    } else if (findNextIncreased(player2,1) || findNextIncreased(player2,6) || findNextIncreased(player2,7) || findNextIncreased(player2,8)) {
      setWinner('player2 wins')
    } */
  },[turn]);

  return (
    <div className='pg-container'>
      {props.list.map((play, index) => (
        <span onClick={() => handleButton(index)} className={style(index)} key={index}>{index}</span>
        ))}
      {winner && (
        <h1>{winner}</h1>
        )}
      <button onClick={() => again()}>Play Again</button>
      { turn ? <h1>Yellow Turn</h1> : <h1>Red Turn</h1>}
    </div>
  )
} 