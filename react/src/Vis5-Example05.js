import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

export default function Visualization5(props) {

  const [demo_state, setDemoState] = useState(0);
  const [demo_msg, setDemoMsg] = useState(undefined);

  const buttonClick = (bool_data) => {
    if(bool_data){
      setDemoState(1)
      setDemoMsg("Good job!")
    } else {
      setDemoState(2)
      setDemoMsg("Try again")
    }
  }

  return (
      <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ paddingBottom: '75px' }}>

        <Grid item>

          <h1>Demo 1</h1>
          <br />
          <div className="row justify-content-md-center text-center" style={{ fontSize: '1.5em' }}>
            <div className="col-4">
              <p>Explanation</p>
            </div>
            <div className="col-4">
              <p><strong>Demo</strong></p>
            </div>
          </div>
          <br />
          <p>Which scatterplot (<strong>Option A</strong> or <strong>Option B</strong>) shows a clearer cluster structure? <br/> You can click the button or the image.</p>

        </Grid>

        <Grid
          container direction="row"
          justifyContent="center" alignItems="center">

           <Grid item>
            <Grid
              container direction="column"
              justifyContent="center" alignItems="center">
                <button type="button" className="btn btn-primary" style={{ width: '200px' }} onClick={() => { buttonClick(1) }}>Option A</button>
                <img onClick={() => { buttonClick(1) }} className="img-fluid" alt="scatterplot" src="img/example05a.png" width={250} height={250}/>
            </Grid>
          </Grid>
        
           <Grid item>
            <Grid
              container direction="column"
              justifyContent="center" alignItems="center">
                <button type="button" className="btn btn-primary" style={{  width: '200px' }} onClick={() => { buttonClick(0) }}>Option B</button>
                <img onClick={() => { buttonClick(0) }} className="img-fluid" alt="scatterplot" src="img/example05b.png" width={250} height={250}/>
            </Grid>
          </Grid>

        </Grid>

        {(demo_state !== 0) ? (<p className="text-center">{demo_msg}</p>) : undefined }

        <br />

        <Grid
          container direction="row"
          justifyContent="center" alignItems="center">
           <Grid item>
            <button type="button" className="btn btn-secondary" style={{ width: '100px' }} onClick={props.previousPage}>Back</button>
          </Grid>
           <Grid item>
            {
              (demo_state === 1) ? (<button type="button" className="btn btn-primary" style={{ marginLeft: '10px', width: '100px' }} onClick={props.nextPage}>Next</button>) : undefined
            }
          </Grid>
        </Grid>

      </Grid>
  );
}
