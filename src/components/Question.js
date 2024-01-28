import React, {useEffect, useState} from 'react'
import "./css/Question.css"
import Landing from "./codeEditor/Landing"
import CountDownTimer from "./CountDownTimer"
import { useNavigate } from 'react-router-dom';


const Question = () => {
  const [isTimerRunning, setTimerRunning] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);
  const navigate = useNavigate();


  const handleTimerStop = (remainingSeconds) => {
    setTimerRunning(false);
    setRemainingTime(remainingSeconds);
    navigate('/scoreboard');
  };

  const handleSubmit = () => {
    // Handle your submit logic here
    // Access remainingTime for the remaining time value
    console.log(`Remaining Time: ${remainingTime} seconds`);
    handleTimerStop(remainingTime); // Pass the remaining time back to the timer
  };

  return (
    <div>
      <div className='timerAndSubmit'>
        <CountDownTimer
          initialTimeInSeconds={10} // Set the initial time as needed
          isRunning={isTimerRunning}
          onStop={handleTimerStop}
          onTick={(remainingSeconds) => setRemainingTime(remainingSeconds)}
        />
        <button className="submitButton" onClick={handleSubmit}>Submit</button>
      </div>

      <Landing />
    </div>
  );
};

export default Question