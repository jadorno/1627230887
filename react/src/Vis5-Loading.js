import React, { useEffect, useState } from 'react';

export default function Loading() {

  const [secondsTimer, setSecondsTimer] = useState(0);
  const [timeouts, setTimeouts] = useState([]);

  const clearTimeouts = () => {
    timeouts.forEach(clearTimeout);
  }

  const increaseTimer = () => {
    let tmpArr = timeouts
    tmpArr.push(setTimeout(increaseTimer.bind(this), 1000))
    setTimeouts(tmpArr)

    setSecondsTimer((secondsTimer + 1) % 4);
  }

  useEffect(() => {
    let tmpArr = timeouts
    tmpArr.push(setTimeout(increaseTimer.bind(this), 1000))
    setTimeouts(tmpArr)

    return () => {
      clearTimeouts()
    };
  }, 
  	[clearTimeouts, increaseTimer]
  )

  return (
    <div>
      <h1>Loading{Array(secondsTimer + 1).join(' .')}</h1>
    </div>
  );
}
