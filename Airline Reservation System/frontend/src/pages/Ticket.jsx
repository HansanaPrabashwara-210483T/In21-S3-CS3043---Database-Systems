import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import NavBar from './Navbar'
import { Container,Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate, useLocation } from 'react-router-dom';
import {Button} from '@mui/material';
import axios from 'axios'
import {useState} from 'react'
import {useEffect} from 'react'
import Typography from '@mui/material/Typography';
import HiveSharpIcon from '@mui/icons-material/HiveSharp';
import Toolbar from '@mui/material/Toolbar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Ticket() {
    const [booking,setBookings] = useState([])
    const [isButtonHidden, setIsButtonHidden] = useState(false);


    const location = useLocation()
    const booking_id = location.pathname.split("/")[2]

    useEffect(() => {
        const fetchALLModels = async() => {
            try {
                const res = await axios.get("http://localhost:8000/customer_booking/"+booking_id)
                setBookings(res.data[0]);
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchALLModels()
    }, [])

    console.log(booking["origin"]);
    
    const removeTAndZ = (dateString) => {
        if(dateString === undefined) return("");
        const [date, time] = dateString.split(/T|Z/);
        const [t,sec] = time.split(".")
        const [h,m,s] = t.split(":")
        return date + " | " + h + " : " + m;
    };


    const printPage = () => {
        window.print();
    };

    const combineEvent = () => {
        setIsButtonHidden(true);
        setTimeout(() => {
            printPage();
        }, 50); 
        setTimeout(() => {
            setIsButtonHidden(false);
        }, 1000); 
    };

    return(
        <>
        {!isButtonHidden && (< NavBar />)} <Container>

        <Container>
            <Grid>
      
                <h1>Your Ticket
                {!isButtonHidden && (
                                <Button
                                    id="myButton"
                                    variant="contained"
                                    onClick={combineEvent}
                                    style={{
                                        float: 'right',
                                        backgroundColor: '#000000'
                                    }}
                                >
                                    Print Report
                                </Button>
                            )}
                </h1>
      
            </Grid>
        </Container>
        
        
      
        <Container sx={{marginTop:"10vh", justifyContent:"center", display:"flex"}}>
            <Box sx={{backgroundColor:"black", width:"75%",borderRadius:"10px", height:"50vh",background: 'linear-gradient(160deg, rgba(117,116,116,1) 0%, rgba(0,0,0,1) 58%, rgba(0,0,0,1) 100%)'}}>
                <Container sx={{color:"#fff"}}>
                <Toolbar disableGutters>   
                <HiveSharpIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>  
                <Typography variant="h6"sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.0rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}>
                    B Airlines
                </Typography>
                </Toolbar>

                <Container>
                    <Typography variant='h2'>
                        {booking.origin} <ArrowForwardIcon sx={{fontSize:"0.7em"}}/> {booking.destination}
                    </Typography>
                    <Typography variant='p'>
                        Aircraft: {booking.call_sign}
                        <br/>
                        Seat No: {booking.seat_class}-{booking.seat_number}
                        <br/>
                        Class : {
                            booking.seat_class === "E" && "Economy"
                            || booking.seat_class === "B" && "Business"
                            || booking.seat_class === "P" && "Platinum"
                        }
                        <br/>
                        Departure : {removeTAndZ(booking.departure_time)}
                        <br/>
                        Arrival : {removeTAndZ(booking.arrival_time)}
                        <br/>
                       

                    </Typography>
                    <Typography variant='p'>

                        Name : {booking.name}
                        <br/>
                        NIC : {booking.nic}
                        <br/>
                        Passport Id : {booking.passport_id} 
                    </Typography>
                </Container>

                </Container>
            </Box>
        </Container>
                
        </Container>
        </>
    );
}