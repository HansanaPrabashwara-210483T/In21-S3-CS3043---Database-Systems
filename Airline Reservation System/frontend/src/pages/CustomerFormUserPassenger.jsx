import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from './Navbar'
import HiveSharpIcon from '@mui/icons-material/HiveSharp';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {MuiTelInput} from 'mui-tel-input'
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";


export default function CustomerFormUserPassenger() {

    const [name, setName] = React.useState("");
    const [dob, setDob] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [nic, setNic] = React.useState("");
    const [passport_id, setPassportId] = React.useState("");

    // Instead of simply adding the value, we need to create a custom function
    // to concatenate the previous value with the incoming value.

    // TODO: THE ABOVE DOESN'T WORK. Phone number functionality is broken.

    const removeTAndZ = (dateString) => {
        const [date, time] = dateString.split(/T|Z/);
        return date;
    };

    const location = useLocation()
    const flight_id = location.pathname.split("/")[2]
    const user_id = location.pathname.split("/")[3]

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/user_passenger", {
                name: name,
                date_of_birth: dob,
                address: address,
                nic : nic,
                passport_id: passport_id,
                user_id : user_id
            });
            //const id = await getCustomerID();
            const id = response.data.customer_id;
            console.log(response.data.customer_id);
            navigate('/seat_select/'+flight_id+'/'+id);
        } catch (error) {
            console.log(error);
        }

    };


    return (
        <>
            <NavBar/>

            <Container component = "main" maxWidth = "xs" >

                <Box sx = {{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: "20vh"
                }} >

                    <Avatar sx={{m: 1, bgcolor: '#000000'}}>
                        <HiveSharpIcon/>
                    </Avatar>

                    <Typography component = "h1" variant = "h5">
                        Your Details
                    </Typography>

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
                            onChange={(e) => {setName(e.target.value);}}
                        />

                        <Box sx={{marginTop:2, marginBottom:1}}>
                            <LocalizationProvider dateAdapter = {AdapterDayjs} >
                                <DemoItem >
                                    <DatePicker label="Date of Birth" format="DD/MM/YYYY" name="dob" id="dob" onChange={(val) => {setDob(removeTAndZ(val.format()));}}/>
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
                            onChange={(e) => {setAddress(e.target.value);}}
                            autoComplete="address"
                        />



                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nic"
                            label="NIC"
                            name="nic"
                            onChange={(e) => {setNic(e.target.value);}}
                            autoComplete="nic"
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="passport-id"
                            label="Passport ID"
                            name="passport_id"
                            onChange={(e) => {setPassportId(e.target.value);}}
                            autoComplete="passportid"
                        />


                        <Button type = "submit" fullWidth variant = "contained"
                                sx = {{ mt: 6, mb: 2, backgroundColor:"black" }}>
                            Next
                        </Button>

                    </Box>
                </Box>
            </Container>
        </>
    );
}