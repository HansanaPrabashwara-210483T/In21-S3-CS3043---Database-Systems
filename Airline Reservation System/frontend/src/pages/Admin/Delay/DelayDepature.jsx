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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Navigate } from "react-router-dom";



const Delay_Arrival = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const flight_id = location.pathname.split("/")[2]

  const [depature_delay, setDepatureDelay] = React.useState(null);

  const removeTAndZ = (dateString) => {
    const [date, time] = dateString.split(/T|Z/);
    const [t,sec] = time.split("+");
    return t;
  };

  const handleClick = async e =>{
    e.preventDefault()
    try{
        await axios.put("http://localhost:8000/departure_delay/"+ flight_id,{"delay_departure":  removeTAndZ(depature_delay.format())})
        navigate('/delay')
    }
    catch(err){
      console.log(err);
    }
  }

  


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
            Update Departure Delay
          </Typography>
          <Box component="form"  noValidate sx={{ mt:  1}}>
            
                  
                  <Box sx={{marginTop:2, marginBottom:1}}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={2} sx={{ minWidth: 400 }}>
                      <TimePicker label="Departure Delay" 
                      ampm={false}
                      value={depature_delay}
                      onChange={(val) =>{setDepatureDelay(val);}}
                      name = "delay_depature"
                      />
                    </Stack>
                  </LocalizationProvider>
                  </Box>

                  

                
            <Button  color="error"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 2,backgroundColor:"black", width:"49%", float:"left", ":hover":{backgroundColor:"#36454F"}}}
              href='/delay'>
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


export default Delay_Arrival