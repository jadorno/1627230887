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
          <h1>Task Instructions</h1>
          <div className="row justify-content-md-center">
            <div className="col-6">
              <p><b>Cluster</b>: A cluster is a set of data points that are similar and group together. E.g., in the given scatterplot, we can see that similar data points are grouped together.</p>
            </div>
          </div>
        </Grid>

        <Grid item>
          <img className="img-fluid" alt="scatterplot" src="img/example03.jpg" width={250} height={250}/>
        </Grid>

        <br />
        <br />

        <Grid item>
          <p>This next page will guide you how continue the study. We have two examples to demonstrate, and each one is divided into three parts :</p>
          <ul>
            <li>What is the task?</li>
            <li>Example of the task.</li>
            <li>One trial task.</li>
          </ul>
        </Grid>

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
