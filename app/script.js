import React, { useState, useMemo } from 'react';
import { render } from 'react-dom';

const Description = () => {
  return (
    <React.Fragment>
      <p>
        According to optometrists in order to save your eyes, you should follow
        the 20/20/20. It means you should to rest your eyes every 20 minutes for
        20 seconds by looking more than 20 feet away.
      </p>
      <p>
        This app will help you track your time and inform you when it's time to
        rest.
      </p>
    </React.Fragment>
  );
};

const TIME_IN_SECONDS = 6;

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const formatTime = useMemo(() => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    return `${formattedMinutes}:${formattedSeconds}`;
  }, [time]);

  const startTimer = () => {
    setTime(TIME_IN_SECONDS);
    setStatus('work');

    let intervalId = setInterval(() => {
      setTime((prevTime) => {
        console.log('prevTime: ', prevTime);

        if (prevTime <= 1) {
          clearInterval(intervalId);
          setTimer(null);

          // Status switching logic should be here, when timer actually ends
          setStatus((prevStatus) => {
            console.log('current status: ', prevStatus);

            if (prevStatus === 'work') {
              console.log('switching to reset');
              return 'reset';
            }
            if (prevStatus === 'reset') {
              console.log('switching to work');
              return 'work';
            }

            return prevStatus;
          });

          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    setTimer(intervalId);
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && <Description />}
      {status === 'work' && (
        <React.Fragment>
          <img src='./images/work.png' />
          <div className='timer'>{formatTime}</div>
          <button className='btn'>Stop</button>
        </React.Fragment>
      )}
      {status === 'reset' && (
        <React.Fragment>
          <img src='./images/rest.png' />
          <div className='timer'>{formatTime}</div>
          <button className='btn'>Stop</button>
        </React.Fragment>
      )}

      {status === 'off' && (
        <React.Fragment>
          <button className='btn' onClick={startTimer}>
            Start
          </button>
        </React.Fragment>
      )}

      <button className='btn btn-close'>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
