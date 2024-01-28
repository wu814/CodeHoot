import React , { useRef } from 'react'
import "./css/Home.css"
import { Link } from 'react-router-dom'
import { firestore } from "../firebase_setup/firebase"
import { addDoc, collection } from "@firebase/firestore"


const Home = () => {

  const messageRef = useRef()
  const ref = collection(firestore, "messages")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(messageRef.current.value)

    let data = {
      message: parseInt(messageRef.current.value)+1
    }

    try {
      addDoc(ref, data)
    } catch(err) {
      console.log(err)
    }
  }

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

      <form onSubmit={handleSubmit}>
        <input type="text" ref={messageRef} />
        <button type="submit">Send</button>
      </form>

    </div>
  )
}

export default Home