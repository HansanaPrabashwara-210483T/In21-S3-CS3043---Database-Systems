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



const Route_Add = () => {
  const [the_model,setModel] = useState({
   
  });

  const navigate = useNavigate()


  const handleChange = (e) =>{
    setModel((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async e =>{
    e.preventDefault()
    try{
      await axios.post("http://localhost:8000/route",the_model)
      navigate("/route")
    }catch(err){
      console.log(err);
    }

  }

  console.log(the_model);

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
            New Aircraft
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              autoFocus
              fullWidth
              id="origin"
              label="Origin"
              name="origin"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
          
              fullWidth
              id="destination"
              label="Destination"
              name="destination"
              onChange={handleChange}
              
            />
            <TextField
              margin="normal"
              required
              
              fullWidth
              id="economy_price"
              label="Economy Price"
              name="economy_price"
              type="number"
              onChange={handleChange}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="business_price"
              label="Business Price"
              name="business_price"
              type="number"
              onChange={handleChange}
              
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id="platinum_price"
              label="Platinum Price"
              name="platinum_price"
              autoComplete="platinum_price"
              onChange={handleChange}
              
            />
           
           <Button  color="error"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 2,backgroundColor:"black", width:"49%", float:"left", ":hover":{backgroundColor:"#36454F"}}}
              href='/aircraft'>
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


export default Route_Add