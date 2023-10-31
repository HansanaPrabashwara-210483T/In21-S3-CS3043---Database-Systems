import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from './Navbar'

import HiveSharpIcon from '@mui/icons-material/HiveSharp';



const UserBookingType = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const flight_id = location.pathname.split("/")[2]


  return (
    <>
            <NavBar/>
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
            Booking Type
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
         
            <Button    type="submit"
              fullWidth
              variant="contained"
              onClick={()=>navigate("/seat_select/"+flight_id+"/"+localStorage.getItem("customer_id"))}
              sx={{ mt: 6,mb: 2,backgroundColor:"black", ":hover":{backgroundColor:"#36454F"}}}
              >
                  Booking for Me
            </Button>

            <Button    type="submit"
              fullWidth
              variant="contained"
              onClick={()=>navigate("/user_passenger/"+flight_id+"/"+localStorage.getItem("user_id"))}
              sx={{ mt: 1,mb: 2,backgroundColor:"black", ":hover":{backgroundColor:"#36454F"}}}
              >
                  Booking for Other
            </Button>

           
          </Box>
        </Box>
      </Container>
      </>
  );
}


export default UserBookingType