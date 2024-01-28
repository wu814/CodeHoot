"use client"; // necessary for useState to work
import React, {useState, useEffect} from 'react'
import "./css/Scoreboard.css"
import UserRank from './UserRank'
import {getDocs, collection} from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"


const Scoreboard = () => {

  const [playerList, setPlayerList] = useState([]) 
  const [sortedPlayerList, setSortedPlayerList] = useState([])
  
  const sortPlayerList = (playerList) => {
      setSortedPlayerList(playerList.sort((a, b) => 
      b.props.totalScore - a.props.totalScore
    ))
  }
  const fetchData = async () => {
    setPlayerList([])
    setSortedPlayerList([])
    const ref = collection(firestore, "names")
    try {
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((player) => {
        setPlayerList(prevList => [...prevList, <UserRank userName={player.data()['name']} totalScore={player.data()['score']}/>])
      }); 
    } catch (error) {
      console.error('Error getting documents: ', error);
    }    
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    sortPlayerList(playerList)
  }, [playerList])

  return (
    <div className='main'>

      <div className='header'>
        <h1>Scoreboard</h1> 
      </div>
      <div className='leaderBoard'>
        <ul className='playerList'> 
          {sortedPlayerList.slice(0,5).map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Scoreboard