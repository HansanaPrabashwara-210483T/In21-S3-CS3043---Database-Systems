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



const Location_Update = () => {
  const [locations,setlocation] = useState({
    location_name :"",
    parent_location_id :null
  });



  const navigate = useNavigate()
  const location = useLocation()

  const route_id = location.pathname.split("/")[2]


  const handleChange = (e) =>{
    setlocation((prev) => ({...prev, [e.target.name]: e.target.value}));
    console.log(locations);

  };

  const handleClick = async e =>{
    e.preventDefault()
    try{
      await axios.put("http://localhost:8000/location/"+ route_id,locations)
      navigate("/location")
      console.log(locations);

    }catch(err){
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
            Update Route
          </Typography>
          <Box component="form"  noValidate sx={{ mt:  1}}>
            

          <TextField
              margin="normal"
              required
              autoFocus
              fullWidth
              id="location_name"
              label="Location Name"
              name="location_name"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              
              fullWidth
              id="parent_location_id"
              label="Parent Location ID"
              name="parent_location_id"
              type="number"
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
                  Update
            </Button>

      </Box>
      </Box>
      </Container>
      </>
  );
}


export default Location_Update