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
        	<h1>The experiment will now begin.</h1>
          <p>
            You will now complete 12 tasks based on the following question
            <br />
            "Which scatterplot has a clearer cluster structure?"
          </p>
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
