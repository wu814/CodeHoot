import React from 'react'
import "./css/Scoreboard.css"

const Scoreboard = () => {
  return (
    <div className='main'>

      <div className='header'>
        <h1>Scoreboard</h1> 
      </div>

      <div className='leaderBoard'>
        <p>Leader Board</p>
        <ul className='playerList'> 
          <li>Player 1: 100</li>
          <li>Player 2: 90</li>
          <li>Player 3: 80</li>
          <li>Player 4: 70</li>
          <li>Player 5: 60</li>
        </ul>
      </div>
    </div>
  )
}

export default Scoreboard