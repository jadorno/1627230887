import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

export default function Visualization5(props) {
  const [seconds_timer, setSecondsTimer] = useState(0);
  const [timeouts, setTimeouts] = useState([]);
  const [timestamp, setTimestamp] = useState(undefined);
  const seconds_wait = 10

  const clearTimeouts = () => {
    timeouts.forEach(clearTimeout);
  }

  const increaseTimer = () => {
    setSecondsTimer(seconds_timer + 1);
    if(seconds_timer >= seconds_wait){
      let old_timestamp = timestamp
      setTimestamp(Date.now())
      setSecondsTimer(0)
      props.nextPage([0, props.qIndex, -1, old_timestamp])
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
      <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ paddingBottom: '75px' }}>

        <Grid item>
          <h1>Question {props.qIndex + 1} of 18</h1>
          <p>Which scatterplot (<strong>Option A</strong> or <strong>Option B</strong>) has a clearer cluster structure?</p>
        </Grid>

        <Grid
          container direction="row"
          justifyContent="center" alignItems="center">

           <Grid item>
            <Grid
              container direction="column"
              justifyContent="center" alignItems="center">

                <button type="button" className="btn btn-primary" style={{ width: '200px' }} onClick={() => {
                  let old_timestamp = timestamp
                  setTimestamp(Date.now())
                  setSecondsTimer(0)
                  props.nextPage([0, props.qIndex, props.data[props.qIndex].imgA, old_timestamp])
                }} >Option A</button>
                <img onClick={() => {
                  let old_timestamp = timestamp
                  setTimestamp(Date.now())
                  setSecondsTimer(0)
                  props.nextPage([0, props.qIndex, props.data[props.qIndex].imgA, old_timestamp])
                }} className="img-fluid" alt="scatterplot" src={props.data[props.qIndex].imgA.scatter} width={250} height={250}/>

            </Grid>
          </Grid>
        
           <Grid item>
            <Grid
              container direction="column"
              justifyContent="center" alignItems="center">

                <button type="button" className="btn btn-primary" style={{ width: '200px' }} onClick={() => {
                  let old_timestamp = timestamp
                  setTimestamp(Date.now())
                  setSecondsTimer(0)
                  props.nextPage([0, props.qIndex, props.data[props.qIndex].imgB, old_timestamp])
                }} >Option B</button>
                <img onClick={() => {
                  let old_timestamp = timestamp
                  setTimestamp(Date.now())
                  setSecondsTimer(0)
                  props.nextPage([0, props.qIndex, props.data[props.qIndex].imgB, old_timestamp])
                }} className="img-fluid" alt="scatterplot" src={props.data[props.qIndex].imgB.scatter} width={250} height={250}/>

            </Grid>
          </Grid>

        </Grid>

        <br /><br /><br />

        <Grid item>
          <p className="text-center">{seconds_timer}/{seconds_wait} seconds</p>
        </Grid>

        <Grid item>
          <div className="progress col-6">
            <div className="progress-bar" role="progressbar" style={{width: parseInt(100*seconds_timer/seconds_wait)+"%"}} aria-valuenow={seconds_timer} aria-valuemin={0} aria-valuemax={seconds_wait}></div>
          </div>
        </Grid>

      </Grid>

  );
}
