import React, {useState, useEffect } from 'react'

const CountDownTimer = ({ initialTimeInSeconds, isRunning, onStop, onTick }) => {
  const [time, setTime] = useState(initialTimeInSeconds);
  const [outOfTime, setOutOfTime] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (time > 0) {
          setTime((prevTime) => {
            if (onTick) {
              onTick(prevTime);
            }
            return prevTime - 1;
          });
        } else {
          setOutOfTime(true);
          clearInterval(timer);
          if (onStop) {
            onStop(time); // Pass the remaining time back to the parent component
          }
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, time, onStop, onTick]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      <div>
        <p>Time Remaining: {formatTime(time)}</p>
        {outOfTime && <p>Time's up!</p>}
      </div>
    </div>
  );
};

export default CountDownTimer;