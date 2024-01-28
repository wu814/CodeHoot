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
        <ul className='playerList'> 
          <li><UserRank userName={"Shannon"} totalTime={69} /></li>
          <li><UserRank userName={"Andrew"} totalTime={79} /></li>
          <li><UserRank userName={"Daniel"} totalTime={89} /></li>
          <li><UserRank userName={"Wu"} totalTime={99} /></li>
          <li><UserRank userName={"Jack"} totalTime={99} /></li>
        </ul>
      </div>
    </div>
  )
}

export default Scoreboard