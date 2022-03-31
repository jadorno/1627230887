import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Home';
import Visualization1 from './Vis1';
import Visualization2 from './Vis2';
import Visualization3 from './Vis3';
import Visualization4 from './Vis4';
import Visualization5 from './Vis5';

import { makeStyles, useTheme } from '@mui/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function App() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          {'name': 'Automatic', 'link': '/vis-1'}, 
          //{'name': 'Optimal All', 'link': '/vis-3'},
          //{'name': 'Optimal Each', 'link': '/vis-4'},
          {'name': 'Manual', 'link': '/vis-2'},
          {'name': 'User Study', 'link': '/vis-5'}
        ].map((data, index) => (
          <ListItem button component={Link} to={data.link} key={data.name}>
            <ListItemIcon>
              <RadioButtonCheckedIcon />
            </ListItemIcon>
            <ListItemText primary={data.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          {'name': 'Data', 'link': '/external-1'}
          //{'name': 'Notebooks', 'link': '/vis-3'},
          //{'name': 'User Study Data', 'link': '/external-2'}
        ].map((data, index) => (
          <ListItem button component={Link} to={data.link} key={data.name}>
            <ListItemIcon>
              <RadioButtonCheckedIcon />
            </ListItemIcon>
            <ListItemText primary={data.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );



  return (
    <Router>
      <div>

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>

              <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Optimization Interfaces
                </Typography>
              </Link>
              <IconButton size="large" edge="end" color="inherit" sx={{ mr: 2 }} onClick={toggleDrawer('right', true)} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}>
                {list('right')}
              </Drawer>

            </Toolbar>
          </AppBar>
        </Box>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/vis-1">
            <Visualization1 />
          </Route>
          <Route path="/vis-2">
            <Visualization2 />
          </Route>
          <Route path="/vis-3">
            <Visualization3 />
          </Route>
          <Route path="/vis-4">
            <Visualization4 />
          </Route>
          <Route path="/vis-6">
            <Visualization5 />
          </Route>
          <Route path='/vis-5' component={() => { 
            window.location.href = 'http://scatter2.projects.jadorno.com/'; 
            return null;
          }}/>
          <Route path='/external-1' component={() => { 
            window.location.href = 'https://osf.io/cxgq2/?view_only=bbcf6c781bec44779fcb64cf0871e91b'; 
            return null;
          }}/>
        </Switch>
      </div>
    </Router>
  );
}

