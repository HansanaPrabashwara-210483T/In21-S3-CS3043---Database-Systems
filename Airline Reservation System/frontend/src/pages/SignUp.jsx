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
import {colors} from '@mui/material';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';



// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {

    function Label({componentName, valueType, isProOnly}) {
        const content = (
            <span>
                <strong>{componentName}</strong>
                for {valueType}
                editing
            </span>
        );
    }

        const handleSubmit = (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            console.log({
                email: data.get('email'),
                password: data.get('password')
            });
        };

        const [value,
            setValue] = React.useState('+94')

        const handleChange = (newValue) => {
            setValue(newValue)
        }

        return ( <> 
        <NavBar/> <Container component = "main" maxWidth = "xs" > <CssBaseline/> < Box sx = {{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: "20vh"
          }} > <Avatar sx={{
            m: 1,
            bgcolor: '#000000'
        }}>
            <HiveSharpIcon/>
        </Avatar> < Typography component = "h1" variant = "h5" > Sign Up </Typography>
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

<Box sx={{marginTop:2, marginBottom:1}}>
        <LocalizationProvider dateAdapter = {AdapterDayjs} > 
            <DemoItem >
                <DatePicker label="Date of Birth" />
            </DemoItem>    
        </LocalizationProvider> 
        </Box>
           


         <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoComplete="address"
           /> 
            
            < MuiTelInput margin = "normal" required fullWidth id = "phone-number" name = "phone-number" autoComplete = ""  label = "Phone Number" value = {
            value
        }
        onChange = {
            handleChange
        } /> 

      
        
    <TextField
            margin="normal"
            required
            fullWidth
            id="nic"
            label="NIC"
            name="nic"
            autoComplete="nic"
            /> 

<TextField
            margin="normal"
            required
            fullWidth
            id="passport-id"
            label="Passport ID"
            name="passport-id"
            autoComplete="passportid"
            /> 

    
      
    < TextField margin = "normal" required fullWidth id = "username" label = "User Name" name = "username" autoComplete = "username"  />
    





    <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"/>


<TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="current-password"/>
            
            
            
             < Button type = "submit" fullWidth variant = "contained" sx = {{ mt: 6, mb: 2, backgroundColor:"black" }}> Sign Up </Button>
            
          </Box > </Box> </Container>
      </>
      );
}