import React, {useEffect, useState} from 'react'
import "./css/Question.css"
import Landing from "./codeEditor/Landing"
import CountDownTimer from "./CountDownTimer"
import { addDoc, collection, getDocs, updateDoc,  } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"
import { useNavigate } from 'react-router-dom';


const Question = (playerName) => {
  const [isTimerRunning, setTimerRunning] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);
  const navigate = useNavigate();
  const ref = collection(firestore, "names")


  const updateScores = async (remainingSeconds) => {
    try {
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const docRef = doc(ref, doc.id); // Create a reference to the specific document

        // Update the score field by incrementing it by the specified amount
        updateDoc(docRef, {
          score: doc.data().score + remainingSeconds,
        });
        //console.log(doc.id, ' => ', doc.data()['name'], ' => ', doc.data()['score']);
        // Process each document here (e.g., update state with the fetched data)
      });
      
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }

  // const handleTimerStop = (remainingSeconds) => {
  //   setTimerRunning(false);
  //   setRemainingTime(remainingSeconds);
  //   updateScores(remainingSeconds);

  //   navigate('/scoreboard');
  // };

  // const handleSubmit = () => {
  //   // Handle your submit logic here
  //   // Access remainingTime for the remaining time value
  //   console.log(`Remaining Time: ${remainingTime} seconds`);
  //   handleTimerStop(remainingTime); // Pass the remaining time back to the timer
  // };

  return (
    <div>
      <Landing />
    </div>
  );
};

export default Question