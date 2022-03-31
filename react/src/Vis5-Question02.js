import React, { useEffect, useState } from 'react';

export default function Visualization5(props) {
  const [seconds_timer, setSecondsTimer] = useState(0);
  const [timeouts, setTimeouts] = useState([]);
  const [timestamp, setTimestamp] = useState(undefined);
  const seconds_wait = 15

  const clearTimeouts = () => {
    timeouts.forEach(clearTimeout);
  }

  const increaseTimer = () => {
    setSecondsTimer(seconds_timer + 1);
    if(seconds_timer >= seconds_wait){
      let old_timestamp = timestamp
      setTimestamp(Date.now())
      setSecondsTimer(0)
      props.nextPage([1, props.qIndex, -1, old_timestamp])
    } else {
      let tmpArr = timeouts
      tmpArr.push(setTimeout(increaseTimer.bind(this), 1000))
      setTimeouts(tmpArr)
    }
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
      <div className="container">

        <h1>Question {props.qIndex + 1} of 18</h1>
        <p>Which scatterplot (<strong>Option A</strong> or <strong>Option B</strong>) has a more similar cluster structure to the reference scatterplot (blue box)?</p>

        <div className="row justify-content-md-center">
          <div className="col-4 text-center">
            <button type="button" className="btn btn-primary" style={{ width: '200px' }} onClick={() => {
              let old_timestamp = timestamp
              setTimestamp(Date.now())
              setSecondsTimer(0)
              props.nextPage([1, props.qIndex, props.data[props.qIndex].imgA, old_timestamp])
            }} >Option A</button>
            <img onClick={() => {
              let old_timestamp = timestamp
              setTimestamp(Date.now())
              setSecondsTimer(0)
              props.nextPage([1, props.qIndex, props.data[props.qIndex].imgA, old_timestamp])
            }} className="img-fluid" alt="scatterplot" src={props.data[props.qIndex].imgA.scatter} width={250} height={250}/>
          </div>
          <div className="col-4">
            <p className="text-center"><strong>Reference</strong></p>
            <img style={{ border: '2px solid #A79AFF' }} className="img-fluid" alt="scatterplot" src={props.data[props.qIndex].imgR.scatter} width={250} height={250}/>
          </div>
          <div className="col-4 text-center">
            <button type="button" className="btn btn-primary" style={{ width: '200px' }} onClick={() => {
              let old_timestamp = timestamp
              setTimestamp(Date.now())
              setSecondsTimer(0)
              props.nextPage([1, props.qIndex, props.data[props.qIndex].imgB, old_timestamp])
            }} >Option B</button>
            <img onClick={() => {
              let old_timestamp = timestamp
              setTimestamp(Date.now())
              setSecondsTimer(0)
              props.nextPage([1, props.qIndex, props.data[props.qIndex].imgB, old_timestamp])
            }} className="img-fluid" alt="scatterplot" src={props.data[props.qIndex].imgB.scatter} width={250} height={250}/>
          </div>
        </div>

        <br /><br /><br />

        <div className="row">
          <p className="text-center">{seconds_timer}/{seconds_wait} seconds</p>
        </div>

        <div className="row justify-content-md-center">
          <div className="progress col-6">
            <div className="progress-bar" role="progressbar" style={{width: parseInt(100*seconds_timer/seconds_wait)+"%"}} aria-valuenow={seconds_timer} aria-valuemin={0} aria-valuemax={seconds_wait}></div>
          </div>
        </div>

      </div>
  );
}
