import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Timer = () => {
  const [time, setTime] = useState(59);
  const [isRunning, setIsRunning] = useState(true);
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            return 59;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, time]);

  const progress = (time / 59) * 100;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className='timer'>
        <CircularProgressbar
          value={progress}
          text={`${time}`}
          styles={{
            path: {
              stroke: '#3dc6c1',
              strokeLinecap:'butt',
              strokeWidth: '10px'
            },
            trail: {
              stroke: 'transparent'
            },
            text: {
              fill: '#3dc6c1',
              fontSize: '38px',
              fontFamily:' Oswald, sans-serif',
              textAlign:'center'
            },
          }}
        />
      </div>
    </div>
  );
};

export default Timer;
