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



const AircraftModel_Update = () => {
  const [the_model,setModel] = useState({
    model_id: null,
    call_sign: ""
  });

const [curr, setCurr] = useState([]);

  

  const navigate = useNavigate()
  const location = useLocation()

  const model_id = location.pathname.split("/")[2]

  useEffect(() => {
    const fetchALLModels = async() => {
        try {
            const res = await axios.get("http://localhost:8000/aircraft_model")
            setCurr(res.data);
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    fetchALLModels()
}, [model_id])

  const handleChange = (e) =>{
    setModel((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async e =>{
    e.preventDefault()
    try{
      await axios.put("http://localhost:8000/aircraft_model/"+ model_id,the_model)
      navigate("/aircraft_model")
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
            Update Aircraft
          </Typography>
          <Box component="form"  noValidate sx={{ mt:  1}}>
          <TextField
              margin="normal"
              autoFocus
              fullWidth
              id="brand"
              label="Brand"
              name="brand"
              type="text" 
              onChange={handleChange}
              
            />

            <TextField
              margin="normal"
              fullWidth
              id="model_type"
              label="Model"
              name="model"
              type="text" 
              onChange={handleChange}
            />

            <TextField
              margin='normal'
              fullWidth
              name="economy_seats"
              label="Economy Seats"
              id="e_seats"
              autoComplete="e_seats"
              type='number'
              onChange={handleChange}
              
            />
            <TextField
              margin='normal'
              fullWidth
              name="business_seats"
              label="Business Seats"
              id="b_seats"
              autoComplete="b_seats"
              type='number'
              onChange={handleChange}
              
            />
            <TextField
              margin='normal'
              fullWidth
              name="platinum_seats"
              label="Platinum Seats"
              id="p_seats"
              autoComplete="p_seats"
              type='number'
              onChange={handleChange}
              
            />
            
           
          

            <Button  color="error"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 2,backgroundColor:"black", width:"49%", float:"left", ":hover":{backgroundColor:"#36454F"}}}
              href='/aircraft_model'>
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


export default AircraftModel_Update