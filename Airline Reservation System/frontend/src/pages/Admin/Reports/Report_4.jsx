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


const Report_2= () => {
  
  const [originAirports, setOriginAirports] = useState(['']);
  const [targetAirports, setTargetAirports] = useState(['']);

  const [originAirport, setOriginAirport] = React.useState('');
  const [targetAirport, setTargetAirport] = React.useState('');

  const navigate = useNavigate()

  useEffect(() => {
    // Make an API request to your backend to get the list of airports
    fetch('http://localhost:8000/location/airports')
        .then((response) => response.json())
        .then((data) => {
            setOriginAirports(data);
            setTargetAirports(data);
        })
        .catch((error) => {
            console.error('Error fetching airports:', error);
        });
}, []);


  
  const handleOriginAirportChange = (event) => { // handle origin change
    setOriginAirport(event.target.value);
  };
  const handleTargetAirportChange = (event) => { // handle origin change
    setTargetAirport(event.target.value);
  };

  const handleClick = async e =>{
    e.preventDefault()
    try{
      
      navigate("/reports_4_results/"+originAirport+"/"+targetAirport)
      
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
            Past Flights
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }} width={400}>
          <Box sx={{marginTop:2, marginBottom:1}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Origin Airport</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-1"
                            value={originAirport}
                            label="originAirport"
                            autoFocus
                            onChange={handleOriginAirportChange}
                           >
                            {originAirports.map((originAirport) => (
                                <MenuItem key={originAirport.airport_code} value={originAirport.airport_code}>
                                    {originAirport.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{marginTop:2, marginBottom:1}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Target Airport</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-2"
                            value={targetAirport}
                            label="targetAirport"
                            onChange={handleTargetAirportChange}
                        >
                            {targetAirports.map((targetAirport) => (
                                <MenuItem key={targetAirport.airport_code} value={targetAirport.airport_code}>
                                    {targetAirport.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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


export default  Report_2 