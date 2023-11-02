import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from './Navbar'

import HiveSharpIcon from '@mui/icons-material/HiveSharp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function SignIn() {

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
      event.preventDefault();

      try {

        const response = await axios.post("http://localhost:8000/auth/login", {
          Username: username,
          Password: password
        });

        // If returned status is 200, then login was successfu
        if (response.status === 200) {

          if (response.data.token) {

            // Store the JWT (if it exists) in the client's local-storage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user_id', response.data.user.user_id);
            localStorage.setItem('username', response.data.user.username);
            localStorage.setItem('customer_id', response.data.user.customer_id);

            if(response.data.user.username == "Admin"){
              navigate("/dashboard");
            }else{
              navigate('/booking');
            }

          } else {
            // Redirect to the login page if token is missing
            alert('500 ERROR: Missing JWToken');
            navigate('/sign-in');
          }

         
        } else if (response.status === 401) {
          alert('401 ERROR: ' + response.message);
          

        } else if (response.status === 500) {
          alert('500 ERROR: ' + response.data.message);

        }

      } catch (error) {
        alert('401 ERROR: ' + error.response.data.message);
        navigate('/sign-in');
      }
  };

  return ( <> 
    <NavBar/>

    <Container component = "main" maxWidth = "xs" > 

      <CssBaseline/> 
      <Box 
        sx = {{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
          }} > 

        <Avatar sx={{m: 1, bgcolor: '#000000' }}>
          <HiveSharpIcon/>
        </Avatar> 

        <Typography component = "h1" variant = "h5" > 
          Sign in 
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange = {(e) => { setUsername(e.target.value); }} /> 

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange = {(e) => { setPassword(e.target.value); }} /> 
            
          <Button type = "submit" fullWidth variant = "contained" sx = {{ mt: 6, mb: 2, backgroundColor:"black"}} > 
            Sign In
          </Button>
                
        </Box> 
    </Box> 
  </Container>

  </>
  );
}