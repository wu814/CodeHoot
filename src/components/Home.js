import React from 'react'
import "./css/Home.css"

const Home = () => {
  return (
      <div className="Home">
        <h1>Welcome to Codehoot!</h1>
        <div className="probStatement">Click start whenever everyone is ready. Who doth comeout triumphant over their peers?</div>
  
        <div className='container'>
          <input
            type="text"
            className="username-input"
            placeholder="username"
          />
          <button className='startButton'>Let's Code!</button>
        </div>
      </div>
  )
}

export default Home