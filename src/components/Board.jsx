import './Board.css'

function Board({changeState}) {
  const existing = JSON.parse(localStorage.getItem('winners')) || {}

  const existingKeys = Object.keys(existing)

  let result = null  

  function homePage() {
    changeState('start')
  }

  if (!existingKeys.length) {
    result = <p>No Records</p>
  } else {
    result = existingKeys.map((name) => (
        <p
          key={name}
          className="record"
        >
          {name} - {existing[name]} WPM
        </p>
      ))
  }

  return (
    <div className="board-container">
      <h1 className='game-title'>
        Type Racer
      </h1>
      <button
        className="home-page-button"
        onClick={homePage}
      >
        Home Page
      </button>
      {result}
    </div>
  )
}

export default Board