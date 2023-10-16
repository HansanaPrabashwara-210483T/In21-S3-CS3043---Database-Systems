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



const Flight_Update = () => {
  const [the_model,setModel] = useState({
    model_id: null,
    call_sign: ""
  });

const [curr, setCurr] = useState([]);

  

  const navigate = useNavigate()
  const location = useLocation()

  const aircraft_id = location.pathname.split("/")[2]

  useEffect(() => {
    const fetchALLModels = async() => {
        try {
            const res = await axios.get("http://localhost:8000/airport")
            setCurr(res.data);
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    fetchALLModels()
}, [aircraft_id])

  const handleChange = (e) =>{
    setModel((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async e =>{
    e.preventDefault()
    try{
      await axios.put("http://localhost:8000/airport/"+ aircraft_id,the_model)
      navigate("/airport")
    }catch(err){
      console.log(err);
    }

  }

  
  console.log(curr)
  console.log(the_model);

  return (
    <>
    {/* <NavBar/> */}
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: '20vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#000000' }}>
            <HiveSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Airport
          </Typography>
          <Box component="form"  noValidate sx={{ mt:  1}}>
            
          <TextField
              margin="normal"
              required
              fullWidth
              id="airport_code"
              label="Airport Code"
              name="airport_code"
              autoComplete="airport_code"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Airport Name"
              id="airport_name"
              autoComplete="airport_name"
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              type='number'
              name="location_id"
              label="Location ID"
              id="location_id"
              autoComplete="location_id"
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


export default Flight_Update