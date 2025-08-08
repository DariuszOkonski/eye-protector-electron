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

const WORK_TIME = 6;
const REST_TIME = 20;
const INTERVAL = 1000;
const STATUS = {
  OFF: 'off',
  WORK: 'work',
  RESET: 'reset',
};

const App = () => {
  const [status, setStatus] = useState(STATUS.OFF);
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

  const closeWindow = () => {
    window.close();
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setTime(0);
    setStatus('off');
  };

  const startTimer = () => {
    setTime(WORK_TIME);
    setStatus(STATUS.WORK);

    let intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          setTimer(null);

          // Status switching logic should be here, when timer actually ends
          setStatus((prevStatus) => {
            if (prevStatus === STATUS.WORK) {
              setTime(REST_TIME);

              intervalId = setInterval(() => {
                setTime((prevTime) => {
                  if (prevTime <= 1) {
                    clearInterval(intervalId);
                    setTimer(null);
                    setStatus(STATUS.OFF);
                  }

                  return prevTime - 1;
                });

                setTimer(intervalId);
              }, INTERVAL);

              return STATUS.RESET;
            }
            if (prevStatus === STATUS.RESET) {
              return STATUS.WORK;
            }

            return prevStatus;
          });

          return 0;
        }

        return prevTime - 1;
      });
    }, INTERVAL);

    setTimer(intervalId);
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === STATUS.OFF && <Description />}
      {status === STATUS.WORK && (
        <React.Fragment>
          <img src='./images/work.png' />
          <div className='timer'>{formatTime}</div>
          <button className='btn' onClick={stopTimer}>
            Stop
          </button>
        </React.Fragment>
      )}
      {status === STATUS.RESET && (
        <React.Fragment>
          <img src='./images/rest.png' />
          <div className='timer'>{formatTime}</div>
          <button className='btn' onClick={stopTimer}>
            Stop
          </button>
        </React.Fragment>
      )}

      {status === STATUS.OFF && (
        <React.Fragment>
          <button className='btn' onClick={startTimer}>
            Start
          </button>
        </React.Fragment>
      )}

      <button className='btn btn-close' onClick={closeWindow}>
        X
      </button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
