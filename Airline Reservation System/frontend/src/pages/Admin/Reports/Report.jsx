import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import GridViewIcon from '@mui/icons-material/GridView';
import BookIcon from '@mui/icons-material/Book';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightIcon from '@mui/icons-material/Flight';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import RouteIcon from '@mui/icons-material/Route';
import DataArrayIcon from '@mui/icons-material/DataArray';
import PinDropIcon from '@mui/icons-material/PinDrop';

import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const drawerWidth = 240;
const urls1 = ['/dashboard', '/booking_list','/flight','/aircraft','/airport','/route','/aircraft_model','/location']
const urls2 = ['/user_list', '/reports','/logout']


const Item = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    height: "5vw",
    // boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
    
  }));

  
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  
  
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function AirRoute() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    if (open) {
        setOpen(false);    
    }
    else{
        setOpen(true);
    }
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor:"#000000"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'fixed' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.0rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            B AIRLINES
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
        
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard', 'Bookings' ,'Flights', 'Aircrafts', 'Airports', 'Routes','Aircraft Models', 'Locations'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton href={urls1[index]}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 8 === 0 ? <GridViewIcon/> :
                  index % 8 === 1 ? <BookIcon/>:
                  index % 8 === 2 ? <FlightTakeoffIcon/>:
                  index % 8 === 3 ? <FlightIcon/> :
                  index % 8 === 4 ? <ConnectingAirportsIcon/>:
                  index % 8 === 5 ? <RouteIcon/>:
                  index % 8 === 6 ? <DataArrayIcon/>:
                  <PinDropIcon/>
                  }
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Users', 'Reports', 'Logout'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton href={urls2[index]}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 3 === 0 ? <GroupsIcon /> :
                  index % 3 ===1 ? <AssessmentIcon />:
                  <LogoutIcon/>}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

      <Box component="main" sx={{ flexGrow: 1, paddingTop: 4.5 }}>
        
        
                 
        <Box component="main" sx={{ flexGrow: 1}}>
            <Grid>

                <h1>Reports
                </h1>

            </Grid>
        </Box>
        
      <Box sx={{ width: '80%'}} marginLeft='5%'>
      <Stack spacing={1.5} maxWidth={'80%'}>
        <Item>
            <h2>Adults and Children in a flight

            <Button variant="contained" href="/report_1" style={{float: 'right', backgroundColor: '#000000'}}>Check</Button>
            </h2>
           
        </Item>
        <Item>
        <h2>Number of passengers visiting a destiation
        <Button variant="contained" href="/report_2" style={{float: 'right', backgroundColor: '#000000'}}>Check</Button>
        </h2>
        </Item>
        <Item>
        <h2>Number of bookings by a passenger type
        <Button variant="contained" href="/report_3" style={{float: 'right', backgroundColor: '#000000'}}>Check</Button>
        </h2>
        </Item>
        <Item>
        <h2>Past Flights
        <Button variant="contained" href="/report_4" style={{float: 'right', backgroundColor: '#000000'}}>Check</Button>
        </h2>
        </Item>
        <Item>
        <h2>Revenue by a aircraft types
        <Button variant="contained" href="/report_5" style={{float: 'right', backgroundColor: '#000000'}}>Check</Button>
        </h2>
        </Item>
      </Stack>
      </Box>
    </Box>

      </Box>
    </Box>
  );
}