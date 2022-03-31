import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

export default function Introduction(props) {

    return (
      <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ paddingBottom: '75px' }}>

        <Grid item>

          <h1>Informed Consent Form to Participate in Research</h1>
          <p><strong>Information to Consider Before Taking Part in the Research Study: "Cluster Perception in an Overdrawn Scatterplots"</strong></p>

          <p>Thanks for your interest in participating in this research study. The information in this document should help you decide if you would like to participate. Here is an overview of some basic information you need to know.</p>

          <p><strong>Study Staff</strong>:   This study is being led by Dr. Paul Rosen, Dr. Brenton Wiernik, and Ph.D. students Ghulam Jilani Quadri and Jorge Adorno-Nieves, in the Computer Science and Engineering Department at the University of South Florida, Tampa campus (USF). Dr. Rosen is the Principal Investigator. </p>

          <p><strong>Study Details</strong>: In this research, we investigate the user's cluster perception for a given overdrawn scatterplot rendered.</p>

          <p><strong>Participants</strong>: You are being asked to take part because we value your perceptions of data interpretation. Your feedback will help us develop models for effective visualization design. We will not be requesting any identification information. We will be asking following demographics information: age range, gender, visualization experience, and corrected eye-vision.</p>

          <p><strong>Voluntary Participation</strong>: Your participation is voluntary. You do not have to participate and may stop your participation at any time.</p>

          <p><strong>Benefits, Compensation, and Risk</strong>: You will be compensated with minimum wage and Amazon Mechanical Turk policies. If you decide not to participate in the study or stop your participation at any time, we will not be able to compensate you. This research is considered minimal risk. Minimal risk means that study risks are the same as the risks you face in daily life.</p>

          <p><strong>Time</strong>: The total time required to complete the study will be around 10 minutes.</p>

          <p><strong>Confidentiality</strong>:  Even if we publish the findings from this study, we will keep your study information private and confidential. Anyone with authority to look at your records must keep them confidential.</p>

          <p><strong>Contact Information</strong>: If you have any questions, concerns, or complaints about this study, email Dr. Paul Rosen (prosen@usf.edu) or Ghulam Jilani Quadri (ghulamjilani@usf.edu).</p>

        </Grid>

        <Grid
          container direction="row"
          justifyContent="center" alignItems="center">

           <Grid item>
            <button type="button" className="btn btn-secondary" style={{ width: '100px' }} onClick={props.previousPage}>No</button>
          </Grid>
           <Grid item>
            <button type="button" className="btn btn-primary" style={{ marginLeft: '10px', width: '100px' }} onClick={props.nextPage}>I consent</button>
          </Grid>

        </Grid>

      </Grid>);

}
