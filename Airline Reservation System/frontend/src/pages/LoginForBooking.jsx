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
import NavBar from './Navbar'

import HiveSharpIcon from '@mui/icons-material/HiveSharp';



const LoginForBooking = () => {




  const navigate = useNavigate()


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
            Join with Us
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
         
            <Button    type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 6,mb: 2,backgroundColor:"black", ":hover":{backgroundColor:"#36454F"}}}
              >
                  Sign Up
            </Button>

            <Button    type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 6,mb: 2,backgroundColor:"black", ":hover":{backgroundColor:"#36454F"}}}
              >
                  Sign In
            </Button>

            <Button    type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 6,mb: 2,backgroundColor:"black", ":hover":{backgroundColor:"#36454F"}}}
              >
                  Proceed as a Guest
            </Button>
            
          </Box>
        </Box>
      </Container>
      </>
  );
}


export default LoginForBooking