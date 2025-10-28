import { useState, useEffect } from 'react'
import './App.css'

import StartScreen from './components/StratScreen'
import allWords from './components/Letters'
import WinPage from './components/WinPage'
import Board from './components/Board'

function App() {
  const [wordToShow, setWordToShow] = useState('')
  const [listOfWords, setListOfWords] = useState([])

  const [secondsPast, setSecondsPast] = useState(0)
  const [timerActive, setTimerActive] = useState(false)


  const [currentState, setCurrentState] = useState('start')

  const [playerName, setPlayerName] = useState(null)
  const [inputWord, setInputWord] = useState(null)
  const [counter, setCounter] = useState(0)
  const [initialCounter, setInitialCounter] = useState(0)

  function loadValues(player, counter) {
    setPlayerName(player)
    setCounter(counter)
    setInitialCounter(counter)

    const shuffled = [...allWords].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, counter)

    const randomIndex = Math.floor(Math.random() * selected.length)
    const firstWord = selected.splice(randomIndex, 1)[0]

    setListOfWords(selected)
    setWordToShow(firstWord)
    setCurrentState('game')

    setSecondsPast(0)
    setTimerActive(true)

    setInputWord('')
  }

  function pickRandomWord() {
    const newListOfWords = [...listOfWords]
    const randomIndex = Math.floor(Math.random() * newListOfWords.length)
    const randomWord = newListOfWords.splice(randomIndex, 1)[0]
    setWordToShow(randomWord)
    setListOfWords(newListOfWords)
    if (counter > 1) {
      setCounter(counter-1)
    } else {
      setCurrentState('win')
      setTimerActive(false)
    }
  }

  function checker(e) {
    const value = e.target.value
    setInputWord(value)

    if (value == wordToShow) {
      setInputWord('')
      pickRandomWord()
    }
  }


  function saveWinner() {
    const wpm = (initialCounter / (secondsPast / 60)).toFixed(2)
    const existing = JSON.parse(localStorage.getItem('winners')) || {}

    if (!(playerName in existing)) {
      existing[playerName] = wpm
    } else if (existing[playerName] < wpm) {
      existing[playerName] = wpm
    }

    localStorage.setItem('winners', JSON.stringify(existing))

    return wpm
  }

  useEffect(() => {
    if (!timerActive) return

    const interval = setInterval(() => {
      setSecondsPast(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timerActive])

  if (currentState === 'start') {
    return(
      <StartScreen loadValues={loadValues} changeState={setCurrentState}/>
    )
  }

  if (currentState === 'win') {
    const wpm = saveWinner()
    return (
      <WinPage name={playerName} wpm={wpm} changeState={setCurrentState}/>
    )
  }

  if (currentState === 'board') {
    return (
      <Board changeState={setCurrentState}/>
    )
  }

  return (
    <div className='app-container'>
      <h1 className='game-title'>
        Type Racer
      </h1>
      <p className='app-word'>
        {wordToShow}
      </p>
      <input
        className='game-input'
        value={inputWord}
        type="text"
        onChange={checker}
        autoFocus
      />
    </div>
  )
}

export default App