import React , { useRef } from 'react'
import "./css/Home.css"
import { Link } from 'react-router-dom'
import { firestore } from "../firebase_setup/firebase"
import { addDoc, collection, getDocs } from "@firebase/firestore"
import { useNavigate } from 'react-router-dom';



const Home = () => {

  const messageRef = useRef(null)
  const ref = collection(firestore, "names")
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(messageRef.current.value)
    
    let data = {
      name: messageRef.current.value,
      score: 0
    }

    try {
      addDoc(ref, data)
    } catch(err) {
      console.log(err)
    }    
    navigate('/question');
  }

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data()['name'], ' => ', doc.data()['score']);
        // Process each document here (e.g., update state with the fetched data)
      });
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }

  return (
    <div className="Home">
      <div className="probStatement">Codehoot!</div>

      <div className='container'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="username-input"
            placeholder="Nickname"
            ref={messageRef}
            />
          <button className='startButton' type="submit">OK, let's code!</button>
        </form>

      </div>
      <button onClick={fetchData}>Fetch</button>

    </div>
  )
}

export default Home