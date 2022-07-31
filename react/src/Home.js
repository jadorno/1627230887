import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const linkStyle = { color: 'inherit', textDecoration: 'inherit'}
const widthStyle = { width: 130 }

export default function Home() {

  return (
    <Container maxWidth="md">

      <h2>Automatic Scatterplot Design Optimization for Clustering Identification</h2>
      <h4><a style={linkStyle} href="http://jiquadcs.com">Ghulam Jilani Quadri</a>, <a style={linkStyle} href="https://jennifer.adorno.me">Jennifer Adorno</a>, <a style={linkStyle} href="https://wiernik.org">Brenton M. Wiernik</a> and <a style={linkStyle} href="https://cspaul.com/wordpress/">Paul Rosen</a></h4>
      
      <p>Scatterplots are among the most widely used visualization techniques. Compelling scatterplot visualizations improve understanding of data by leveraging visual perception to boost awareness when performing specific visual analytics tasks. Design choices in scatterplots, such as graphical encodings or data aspects, can directly impact decision-making quality for low-level tasks like clustering. Hence, constructing frameworks that consider both the perceptions of the visual encodings and the task being performed enables optimizing visualization to maximize efficacy. In this paper, we propose here automatic tool to optimize the design factors of scatterplots to reveal the most salient cluster structure. Our approach leverages the merge tree data structure to identify the clusters and optimize the choice of subsampling algorithm, sampling rate, symbol size, and symbol opacity used to generate a scatterplot image. We validate our approach with user and case studies that show it efficiently provides high-quality scatterplot designs from a large parameter space.</p>
      <br/ >


      <Grid container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ paddingBottom: '75px' }}>

         <Grid item>
          <Grid
            container direction="row" spacing={3}
            justifyContent="center" alignItems="center">

            <Grid item><Button style={widthStyle} component={Link} to="/vis-1" variant="contained">Automatic</Button></Grid>
            <Grid item><Button style={widthStyle} component={Link} to="/vis-2" variant="contained">Manual</Button></Grid>
            <Grid item><Button style={widthStyle} component={Link} to="/vis-5" variant="contained">User Study</Button></Grid>
            <Grid item><a style={linkStyle} href="https://osf.io/cxgq2/?view_only=bbcf6c781bec44779fcb64cf0871e91b"><Button style={widthStyle} variant="contained">Data</Button></a></Grid>
            <Grid item><a style={linkStyle} href="https://ieeexplore.ieee.org/document/9826389"><Button style={widthStyle} variant="contained">Paper</Button></a></Grid>
            <Grid item><a style={linkStyle} href="https://github.com/jadorno/usf-dataviz-1627230887"><Button style={widthStyle} variant="contained">Github</Button></a></Grid>

            

          </Grid>
        </Grid>

        <Grid item>
          <img src="/img/teaser.png" width={900} />
        </Grid>

      </Grid>

    </Container>
  );
}
