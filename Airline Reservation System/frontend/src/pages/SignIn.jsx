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

// TODO remove, this demo shouldn't need to reset the theme. const defaultTheme
// = createTheme();

export default function SignIn() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password')
        });
    };

    return ( <> <NavBar/> < Container component = "main" maxWidth = "xs" > <CssBaseline/> < Box sx = {{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }} > <Avatar sx={{
        m: 1,
        bgcolor: '#000000'
    }}>
        <HiveSharpIcon/>
    </Avatar> 
    < Typography component = "h1" variant = "h5" > Sign in </Typography>
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
            /> 
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"/> 
        
        < Button type = "submit" fullWidth variant = "contained" sx = {{ mt: 6, mb: 2, backgroundColor:"black"}} > 
        Sign In
        </Button>
            
          </Box > </Box> </Container>
      </>);
}