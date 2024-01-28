import React from 'react'
import "./css/Scoreboard.css"
import UserRank from './UserRank'

const Scoreboard = () => {
  return (
    <div className='main'>

      <div className='header'>
        <h1>Scoreboard</h1> 
      </div>

      <div className='leaderBoard'>
        <p>Leader Board</p>
        <ul className='playerList'> 
          <li><UserRank userName={"Shannon"} totalTime={69} /></li>
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