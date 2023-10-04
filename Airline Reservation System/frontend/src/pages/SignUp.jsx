import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import NavBar from './Navbar'

import HiveSharpIcon from '@mui/icons-material/HiveSharp';

import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {MuiTelInput} from 'mui-tel-input'

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password')
        });
    };

    const [value,
        setValue] = React.useState('')

    const handleChange = (newValue) => {
        setValue(newValue)
    }

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
    </Avatar> <Typography component = "h1" variant = "h5" > Sign Up </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            /> 
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              autoFocus/> 
              
              < MuiTelInput margin="normal"
              required
              fullWidth
              id="phone-number"
              name="phone-number"
              autoComplete=""
              autoFocus
              label = "Phone Number" 
              value = {
              value
            } onChange = {handleChange} /> 
    
    <LocalizationProvider dateAdapter={AdapterDayjs}  
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
        >
        <Container components={['DatePicker']}>
            <DatePicker label="Date of Birth"
               
            />
        </Container>
    </LocalizationProvider> 

    < TextField margin = "normal" required fullWidth id = "username" label = "User Name" name = "username" autoComplete = "username" autoFocus /> <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"/> 
        <Button type = "submit" fullWidth variant = "contained" sx = {{ mt: 6, mb: 2 }} > Sign Up </Button>
            
          </Box > </Box> </Container>
      </>);
}