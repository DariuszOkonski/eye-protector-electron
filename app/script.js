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
    setTime(1200);
    setStatus('work');
    setTimer(
      setInterval(() => {
        setTime((time) => time - 1);
      }, [1000])
    );
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
      {status === 'reset' && <img src='./images/rest.png' />}

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
