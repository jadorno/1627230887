import React, { useEffect, useState } from 'react';
import axios from "axios";
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Visualization2() {

  const [options_algorithms, setOptionsAlgorithms] = useState([]);
  const [options_dataset, setOptionsDataset] = useState([]);
  const [options_sampling, setOptionsSampling] = useState([]);
  const [options_size, setOptionsSize] = useState([]);
  const [options_opacity, setOptionsOpacity] = useState([]);
  const [options_cluster, setOptionsCluster] = useState([]);

  const [selected_algorithms, setSelectedAlgorithms] = useState(undefined);
  const [selected_dataset, setSelectedDataset] = useState(undefined);
  const [selected_sampling, setSelectedSampling] = useState(undefined);
  const [selected_size, setSelectedSize] = useState(undefined);
  const [selected_opacity, setSelectedOpacity] = useState(undefined);
  const [selected_cluster, setSelectedCluster] = useState(undefined);

  const [selected_data, setSelectedData] = useState({});
  const [ui_controls, setUIControls] = useState([]);

  const handleChangeDataset = (event) => {
    setOptionsAlgorithms([])
    setOptionsSampling([])
    setOptionsSize([])
    setOptionsOpacity([])
    setOptionsCluster([])
    setSelectedAlgorithms(undefined)
    setSelectedSampling(undefined)
    setSelectedSize(undefined)
    setSelectedOpacity(undefined)
    setSelectedCluster(undefined)

    setSelectedDataset(event.target.value)
    setSelectedData({})

    axios.get('api/threshold/algorithms', { params: { dataset: event.target.value } })
      .then((response) => {
        let values = response.data
        setSelectedAlgorithms(values[1]) 
        setOptionsAlgorithms(values)
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('api/threshold/sampling', { params: { dataset: event.target.value } })
      .then((response) => {
        let values = response.data.map(x=>+x).sort((a, b) => { return a - b; });
        setSelectedSampling([values[1]])
        setOptionsSampling(values)
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('api/threshold/size', { params: { dataset: event.target.value } })
      .then((response) => {
        let values = response.data.map(x=>+x).sort((a, b) => { return a - b; });
        setSelectedSize([values[1]])
        setOptionsSize(values)
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('api/threshold/opacity', { params: { dataset: event.target.value } })
      .then((response) => {
        let values = response.data.map(x=>+x).sort((a, b) => { return a - b; });
        setSelectedOpacity([values[1]])
        setOptionsOpacity(values)
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('api/threshold/cluster', { params: { dataset: event.target.value } })
      .then((response) => {
        let values = response.data.map(x=>+x).sort((a, b) => { return a - b; });
        setSelectedCluster([values[1]])
        setOptionsCluster(values)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const fetchImages = () => {

    setSelectedData({});
    let params = {
      dataset: selected_dataset,
      algorithms: JSON.stringify([selected_algorithms]),
      sampling: JSON.stringify(selected_sampling),
      opacity: JSON.stringify(selected_opacity),
      cluster: JSON.stringify(selected_cluster),
      size: JSON.stringify(selected_size),
      results: 1,
    }

    axios.get('api/threshold/get', { params: params })
      .then((response) => {
        setSelectedData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSliderSampling = (event, newValue) => {
    setSelectedSampling(newValue);
  }
  const handleSliderSize = (event, newValue) => {
    setSelectedSize(newValue);
  }
  const handleSliderOpacity = (event, newValue) => {
    setSelectedOpacity(newValue);
  }
  const handleSliderCluster = (event, newValue) => {
    setSelectedCluster(newValue);
  }

  const handleChangeAlgorithm = (event) => {
    setSelectedAlgorithms(event.target.value)
  }

  useEffect(() => {
    if(options_dataset.length === 0){

      axios.get('api/threshold/datasets')
        .then((response) => {
          let response_data = response.data.filter(e => e !== 'ugulinotsne' && e !== 'bitcointsne')
          setOptionsDataset(response_data)

        })
        .catch((error) => {
          console.log(error);
        });

    } else {

      let control_builder = []
      if(options_dataset.length !== 0){
        control_builder.push(
          <div key="slider-dataset">
            <select className="form-control" value={selected_dataset} onChange={handleChangeDataset.bind(this)}>
              <option value="none">Dataset</option>
              {
                options_dataset.map((item, idx) => {
                  return <option key={idx} value={item}>{item}</option>;
                })
              }
            </select>
          </div>
        )
      }

      if(options_algorithms.length !== 0){
        control_builder.push(
          <div key="slider-algorithm">
            <FormControl component="fieldset">
              <FormLabel component="legend">Algorithm <Icon style={{ fontSize: 20 }}>settings</Icon></FormLabel>
              <RadioGroup row aria-label="algorithm" name="gender1" value={selected_algorithms} onChange={handleChangeAlgorithm.bind(this)}>
              {
                options_algorithms.map((item, idx) => {
                  return <FormControlLabel key={idx} value={item} control={<Radio />} label={item.replace('Sampling','')} />;
                })
              }
              </RadioGroup>
            </FormControl>
          </div>
        )
      }

      if(options_sampling.length !== 0){
        let values = options_sampling.map(x => ({value:+x, label:x}));
        control_builder.push(
          <div key="slider-sampling">
            <Typography id="sampling" gutterBottom>
              Sampling Rate <Icon style={{ fontSize: 20 }}>blur_on</Icon>
            </Typography>
            <Slider
              value={selected_sampling}
              onChange={handleSliderSampling.bind(this)}
              name="sampling-slider"
              aria-labelledby="sampling"
              step={null}
              valueLabelDisplay="auto"
              marks={values}
            />
          </div>
        )
      }

      if(options_size.length !== 0){
        let values = options_size.map(x => ({value:+x, label:x}));
        control_builder.push(
          <div key="slider-size">
            <Typography id="size" gutterBottom>
              Point Size <Icon style={{ fontSize: 20 }}>bubble_chart</Icon>
            </Typography>
            <Slider
              value={selected_size}
              onChange={handleSliderSize.bind(this)}
              aria-labelledby="size"
              step={null}
              valueLabelDisplay="auto"
              marks={values}
            />
          </div>
        )
      }

      if(options_opacity.length !== 0){
        let values = options_opacity.map(x => ({value:+x, label:x}));
        control_builder.push(
          <div key="slider-opacity">
            <Typography id="opacity" gutterBottom>
              Point Opacity <Icon style={{ fontSize: 20 }}>tonality</Icon>
            </Typography>
            <Slider
              value={selected_opacity}
              onChange={handleSliderOpacity.bind(this)}
              aria-labelledby="opacity"
              step={null}
              valueLabelDisplay="auto"
              marks={values}
            />
          </div>
        )
      }

      let complex_boolean = selected_dataset !== undefined
      complex_boolean = complex_boolean && selected_sampling !== undefined
      complex_boolean = complex_boolean && selected_size !== undefined
      complex_boolean = complex_boolean && selected_opacity !== undefined
      complex_boolean = complex_boolean && selected_cluster !== undefined
      complex_boolean = complex_boolean && selected_algorithms !== undefined

      if(complex_boolean) {
        fetchImages()     
      }
      setUIControls(control_builder)
    }
  },[
    options_algorithms, options_dataset, 
    options_sampling, options_size, 
    options_opacity, options_cluster, 
    selected_algorithms, selected_dataset,
    selected_sampling, selected_size,
    selected_opacity, selected_cluster
  ])

  const styles = theme => ({
    root: {
      flexGrow: 1,
    },
  });

  return (
    <Container maxWidth="md">

      <h1>Manual Optimization of Scatterplot Design on Clustering</h1>
      
      <p>This work provides an interface to choose the following values: dataset, sampling algorithm, sampling rate (number of points), point size, and opacity. With the provided Interface, implementing the trial and error method, select the values for the above factors to choose an optimal scatterplot design--Optimal design represents salient cluster structure. <u> As the final result provide one optimal scatterplot (with parameters)</u></p>
      <br/ >

      {ui_controls}

      <Grid container className={styles.root} spacing={2}>
      {
        Array.from(selected_data).map((item, idx0) => {
          return(
            <Grid key={idx0} item md={4}>
              <p><Icon style={{ fontSize: 20 }}>blur_on</Icon>{''+item.sampling+' '}<Icon style={{ fontSize: 20, marginLeft: 10 }}>bubble_chart</Icon>{''+item.size+' '}<Icon style={{ fontSize: 20, marginLeft: 10 }}>tonality</Icon>{''+item.opacity+' '}<Icon style={{ fontSize: 20, marginLeft: 10 }}>scatter_plot</Icon>{''+item.clusters} <br /><Icon style={{ fontSize: 20 }}>settings</Icon>{''+item.algorithm}</p>
              <img alt="scatterplot" src={item.scatter} width={250} height={250}/>
            </Grid>
          ) 
        })
      }
      </Grid>

    </Container>
  );
}
