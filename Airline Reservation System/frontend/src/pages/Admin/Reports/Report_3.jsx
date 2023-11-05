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
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import HiveSharpIcon from '@mui/icons-material/HiveSharp';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


const Report_3= () => {
 
  const [departure,setDeparture] = useState(null);
  const [arrival,setArrival] = useState(null);

  const navigate = useNavigate()

  const handleClick = async e =>{
    e.preventDefault()
    try{
      
      navigate("/reports_3_results/"+departure.format()+"/"+arrival.format())
      
    }catch(err){
      console.log(err);
    }

  }



  // console.log(targetAirports);
  // console.log(departure.format());
  // console.log(arrival.format());

  return (
    <>
            {/* <NavBar/> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop:'20vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#000000' }}>
            <HiveSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Bookings by Passenger Type
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }} width={400}>
         
            <Box sx={{marginTop:2, marginBottom:3}}>
                <LocalizationProvider dateAdapter = {AdapterDayjs} > 
                    <DemoItem >
                        <DateTimePicker label="Starting Time"  name="st" id="st" onChange={(val) => {setDeparture(val);}}/>
                    </DemoItem>    
                </LocalizationProvider> 
            </Box>
            <Box sx={{marginTop:2, marginBottom:1}}>
                <LocalizationProvider dateAdapter = {AdapterDayjs} > 
                    <DemoItem >
                        <DateTimePicker label="Ending Time"  name="et" id="et" onChange={(val) => {setArrival(val);}}/>
                    </DemoItem>    
                </LocalizationProvider> 
            </Box>
           
           <Button  color="error"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 2,backgroundColor:"black", width:"49%", float:"left", ":hover":{backgroundColor:"#36454F"}}}
              href='/reports'>
                  Cancel
            </Button>
            <Button    type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 6,mb: 2,backgroundColor:"black", width:"49%", float:"right", ":hover":{backgroundColor:"#36454F"}}}
              onClick={handleClick}>
                  Check
            </Button>
            
          </Box>
        </Box>
      </Container>
      </>
  );
}


export default  Report_3 