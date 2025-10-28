import { useState } from 'react'
import './StartScreen.css'

function StartScreen({loadValues, changeState}) {
  const [playerName, setPlayerName] = useState('Player')
  const [counter, setCounter] = useState(5)

  function funcStart() {
    const intCounter = parseInt(counter)
    const startBool = playerName && 3 <= intCounter && intCounter < 11
    if (startBool) {
      loadValues(playerName, intCounter)
    }
  }

  function changeStateToBoard() {
    changeState('board')
  }


  return (
    <div className='start-screen-container'>
      <h1 className='game-title'>
        Type Racer
      </h1>
      <input
        className="name-input"
        type="text"
        value={playerName}
        onChange={e => setPlayerName(e.target.value)}
      />
      <input
        className="counter-input"
        type="number"
        value={counter}
        onChange={e => setCounter(e.target.value)}
      />
      <button
        className='start-button'
        onClick={funcStart}
      >
        Start Game
      </button>

      <button
        className='winners-button'
        onClick={changeStateToBoard}
      >
        Winners
      </button>
    </div>
  )
}

export default StartScreen