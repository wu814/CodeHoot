import React from 'react'
import { useHistory } from "react-router-dom"
import "./css/Home.css"

const Home = () => {
  const history = useHistory();


  const handleStartClick = () => {
    history.push("/test");
  }
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
          <button className='startButton' onClick={handleStartClick}>Let's Code!</button>
        </div>
      </div>
  )
}

export default Home