import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from '../../Navbar'

import HiveSharpIcon from '@mui/icons-material/HiveSharp';
import Stack from '@mui/material/Stack';


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {DemoItem} from '@mui/x-date-pickers/internals/demo';



const Flight_Add = () => {
  const [flights,setFlights] = useState({});

  const [depature_time, setDepature] = React.useState(null);
  const [arrival_time, setArrival] = React.useState(null);



  const navigate = useNavigate()


  const handleChange = (e) =>{
    setFlights((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async e =>{
    setFlights((prev) => ({...prev, "departure_time": depature_time.format()}));
    setFlights((prev) => ({...prev, "arrival_time": arrival_time.format()}));
    // console.log(flights)
    e.preventDefault()
    try{
      // console.log(flights)
      await axios.post("http://localhost:8000/flight",flights)
      navigate("/flight")
    }catch(err){
      console.log(err);
    }

  }


  console.log(flights);



  return (
    <>
            {/* <NavBar/> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop:'20vh',
            marginBottom:'20vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#000000' }}>
            <HiveSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Flight
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              type='number'
              fullWidth
              id="route_id"
              label="Route ID"
              name="route_id"
              autoComplete="route_id"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              type='number'
              fullWidth
              name='aircraft_id'
              label="Aircraft ID"
              id="aircraft_id "
              autoComplete="aircraft_id "
              onChange={handleChange}
            />

            <Box sx={{marginTop:2, marginBottom:1}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={2} sx={{ minWidth: 305 }}>
                <DateTimePicker
                  label="Depature Time"
                  value={depature_time}
                  onChange={setDepature}
                />
              </Stack>
            </LocalizationProvider>
            </Box>

            <Box sx={{marginTop:2, marginBottom:1}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem>
          <DateTimePicker
                  label="Arrival Time"
                  value={arrival_time}
                  onChange={setArrival}
                />
          </DemoItem>
                
               
            </LocalizationProvider>
            </Box>

            <TextField
              margin="normal"
              required
              fullWidth
              name="status"
              label="status"
              id="status"
              autoComplete="status"
              onChange={handleChange}
            />
            
           
           
           <Button  color="error"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 2,backgroundColor:"black", width:"49%", float:"left", ":hover":{backgroundColor:"#36454F"}}}
              href='/flight'>
                  Cancel
            </Button>
            <Button    type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 6,mb: 2,backgroundColor:"black", width:"49%", float:"right", ":hover":{backgroundColor:"#36454F"}}}
              onClick={handleClick}>
                  Create
            </Button>
            
          </Box>
        </Box>
      </Container>
      </>
  );
}


export default Flight_Add