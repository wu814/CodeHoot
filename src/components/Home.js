import React from 'react'
// import { useHistory } from "react-router-dom"
import "./css/Home.css"
import { Link } from 'react-router-dom'


const Home = () => {
  // const history = useHistory();


  // const handleStartClick = () => {
  //   history.push("/test");
  // }
  return (
    <div className="Home">
      {/* <h1>Welcome to Codehoot!</h1> */}
      <div className="probStatement">Codehoot</div>

      <div className='container'>
        <input
          type="text"
          className="username-input"
          placeholder="username"
        />
        <Link to="/question" className='startButton'>Let's Code!</Link>

      </div>
    </div>
  )
}

export default Home