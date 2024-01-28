import React from 'react'
import "./css/Home.css"
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className="Home">
      <div className="probStatement">Codehoot!</div>

      <div className='container'>
        <input
          type="text"
          className="username-input"
          placeholder="Nickname"
        />
        <Link to="/question" className='startButton'>OK, let's code!</Link>

      </div>
    </div>
  )
}

export default Home