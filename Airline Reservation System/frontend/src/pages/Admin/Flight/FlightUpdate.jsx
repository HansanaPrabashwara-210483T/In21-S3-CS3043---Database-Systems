import axios from 'axios';
import React, { useState } from 'react'
import {useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from '../../Navbar'

import HiveSharpIcon from '@mui/icons-material/HiveSharp';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {DemoItem} from '@mui/x-date-pickers/internals/demo';
import Stack from '@mui/material/Stack';

const Flight_Update = () => {
  const [flight,setFlight] = useState({});



  const navigate = useNavigate()
  const location = useLocation()

  const aircraft_id = location.pathname.split("/")[2]

  
  const [depature_time, setDepature] = React.useState(null);
  const [arrival_time, setArrival] = React.useState(null);


  const handleChange = (e) =>{
    setFlight((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async e =>{
    setFlight((prev) => ({...prev, "departure_time": depature_time.format()}));
    setFlight((prev) => ({...prev, "arrival_time": arrival_time.format()}));
    e.preventDefault()
    try{
      await axios.put("http://localhost:8000/flight/"+ aircraft_id,flight)
      navigate("/flight")
    }catch(err){
      console.log(err);
    }

  }

  
  console.log(flight);

  return (
    <>
    {/* <NavBar/> */}
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: '20vh',
            marginBottom: '20vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#000000' }}>
            <HiveSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Flight
          </Typography>
          <Box component="form"  noValidate sx={{ mt:  1}}>
            
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
                  Update
            </Button>

      </Box>
      </Box>
      </Container>
      </>
  );
}


export default Flight_Update