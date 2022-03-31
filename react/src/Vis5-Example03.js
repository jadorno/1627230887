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
          <h1>STOP</h1>
          <p>Continue to the next page for a new set of instructions.</p>
          <br />
          <p>
            You will now complete 6 tasks based on the following question
            <br />
            "Which scatterplot has a more similar cluster structure to the reference scatterplot?"
          </p>
        </Grid>


        <Grid
          container direction="row"
          justifyContent="center" alignItems="center">
           <Grid item>
            <button type="button" className="btn btn-primary" style={{ marginLeft: '10px', width: '100px' }} onClick={props.nextPage}>Next</button>
          </Grid>
        </Grid>

      </Grid>
  );
}
