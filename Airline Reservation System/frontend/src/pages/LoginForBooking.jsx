import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from './Navbar'

import HiveSharpIcon from '@mui/icons-material/HiveSharp';
import logo from "../assets/logoNameSmall.png";


const LoginForBooking = () => {




    const navigate = useNavigate()
    const location = useLocation()

    const flight_id = location.pathname.split("/")[2]


  return (
    <>
      <NavBar/>
      <br></br>
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
            {/* <HiveSharpIcon /> */}
            <div className="logoDiv" style={{width:"50%"}}>
              <img src={logo} alt="B Airways logo" className="logo" />
            </div>
         
          <Box component="form"  noValidate sx={{ mt: 1 }}>
         
            <Button    type="submit"
              fullWidth
              variant="contained"
              href='/sign-up'
              sx={{ mt: 6,mb: 2,backgroundColor:"black", ":hover":{backgroundColor:"#36454F"}}}
              >
                  Sign Up
            </Button>

            <Button    type="submit"
              fullWidth
              variant="contained"
              href='/sign-in'
              sx={{ mt: 1,mb: 2,backgroundColor:"black", ":hover":{backgroundColor:"#36454F"}}}
              >
                  Sign In
            </Button>

            <Button    type="submit"
              fullWidth
              variant="contained"
              onClick={() => navigate("/guest/"+flight_id)}
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