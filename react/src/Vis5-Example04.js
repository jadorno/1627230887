import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

export default function Visualization5(props) {

  return (
      <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ paddingBottom: '75px' }}>

        <Grid item>
          <h1>Example 1</h1>

          <div className="row justify-content-md-center text-center" style={{ fontSize: '1.5em' }}>
            <div className="col-4">
              <p><strong>Explanation</strong></p>
            </div>
            <div className="col-4">
              <p>Demo</p>
            </div>
          </div>

          <p>You will be shown two scatterplots. Please identify and select the scatterplot (<strong>Option A</strong> or <strong>Option B</strong>) with a clearer cluster structure.</p>
          <p>A clearer cluster structure the scatterplot is shown in a green box.</p>
        </Grid>

        <Grid
          container direction="row"
          justifyContent="center" alignItems="center">

           <Grid item>
            <Grid
              container direction="column"
              justifyContent="center" alignItems="center">
                <button type="button" className="btn btn-primary" style={{ width: '200px' }} disabled>Option A</button>
                <img className="img-fluid" alt="scatterplot" src="img/example04a.png" width={250} height={250}/>
            </Grid>
          </Grid>
        
           <Grid item>
            <Grid
              container direction="column"
              justifyContent="center" alignItems="center">
                <button type="button" className="btn btn-primary" style={{ width: '200px' }} disabled>Option B</button>
                <img className="img-fluid" alt="scatterplot" src="img/example04b.png" width={250} height={250}/>
            </Grid>
          </Grid>

        </Grid>

        <br />

        <Grid
          container direction="row"
          justifyContent="center" alignItems="center">
           <Grid item>
            <button type="button" className="btn btn-secondary" style={{ width: '100px' }} onClick={props.previousPage}>Back</button>
          </Grid>
           <Grid item>
            <button type="button" className="btn btn-primary" style={{ marginLeft: '10px', width: '100px' }} onClick={props.nextPage}>Next</button>
          </Grid>
        </Grid>

      </Grid>
  );
}
