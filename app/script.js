import React, { useState } from 'react';
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
  const [time, setTime] = useState(62);
  const [timer, setTimer] = useState(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && <Description />}
      {status === 'work' && <img src='./images/work.png' />}
      {status === 'reset' && <img src='./images/rest.png' />}

      {status === 'off' && (
        <React.Fragment>
          <div className='timer'>{formatTime(time)}</div>
          <button className='btn'>Start</button>
          <button className='btn'>Stop</button>
        </React.Fragment>
      )}

      <button className='btn btn-close'>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
