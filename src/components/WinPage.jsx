import './WinPage.css'

function WinPage({name, wpm, changeState}) {

  function backToHomePage() {
    changeState('start')
  }

  return(
    <div className='winpage-container'>
      <h1 className='game-title'>
        Type Racer
      </h1>
      <p className='player-name'>
        {name}
      </p>
      <p className='wpm'>
        {wpm} words per minutes
      </p>
      <button
        className='home-page-button'
        onClick={backToHomePage}
      >
        Home Page
      </button>
    </div>
  )
}

export default WinPage