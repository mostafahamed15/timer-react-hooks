import { useState, useEffect } from 'react';
import './styles.css';

const Timer = () => {
  const [seconds, setSeconds] = useState('00');
  const [minutes, setMunites] = useState('00');
  const [hours, setHours] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        const hourCounter = Math.floor(minuteCounter / 60);

        let computedSeconds =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;

        let computedMinutes =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        let computedHours =
          String(hourCounter).length === 1 ? `0${hourCounter}` : hourCounter;
        setSeconds(computedSeconds);
        setMunites(computedMinutes);
        setHours(computedHours);
        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  function stopTimer() {
    setIsActive(false);
    setSeconds('00');
    setMunites('00');
    setHours('00');
    setCounter(0);
  }

  return (
    <div className='container'>
      <div className='label'>
        <span className=''>Hours</span>
        <span className=''>Munites</span>
        <span className=''>Seconds</span>
      </div>
      <div className='time'>
        <span className=''>{hours}</span>
        <span>:</span>
        <span className=''>{minutes}</span>
        <span>:</span>
        <span className=''>{seconds}</span>
      </div>
      <div className='buttons'>
        <button className='start' onClick={() => setIsActive(!isActive)}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={stopTimer} className='reset'>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
