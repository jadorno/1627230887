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
          <p>Please read carefully to the following instructions before you move on next and continue the study.</p>
          <div className="row justify-content-md-center">
            <div className="col-6">
              <p><b>Scatterplot</b>: A scatterplot is a graph that displays values for two variables for a set of data. E.g., in this given scatterplot two variable (let say X and Y ) are plotted.</p>
            </div>
          </div>
        </Grid>

        <Grid item>
          <img className="img-fluid" alt="scatterplot" src="img/example02.jpg"  width={250} height={250}/>
        </Grid>

        <br />
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
