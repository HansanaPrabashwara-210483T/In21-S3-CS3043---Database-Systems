import * as React from 'react';
import NavBar from './Navbar'
import { Container,Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import {useState} from 'react'
import {useEffect} from 'react'
import Typography from '@mui/material/Typography';
import HiveSharpIcon from '@mui/icons-material/HiveSharp';
import Toolbar from '@mui/material/Toolbar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import logo from "../assets/ticketLogo.png";
import Background from "../components/Background";
import CssBaseline from "@mui/material/CssBaseline";

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
        <>{!isButtonHidden && (
            <><NavBar /><Background /></>

        )}
        <br></br>
        

            
            <div className={!isButtonHidden &&("signinContainer")}>
            <CssBaseline />
            <div className={!isButtonHidden &&("glassBox")}>
        <Container>
        <Container sx={{ justifyContent:"center", display:"flex"}} className="signin">
            <Grid>
      
                <h1>Your Ticket </h1>
                
      
            </Grid>
        </Container>
        
        
      
        <Container sx={{marginTop:"10vh", justifyContent:"center", display:"flex"}}>
            <Box sx={{backgroundColor:"black",width:"55vw",borderRadius:"10px",background: 'linear-gradient(160deg, rgba(117,116,116,1) 0%, rgba(0,0,0,1) 58%, rgba(0,0,0,1) 100%)'}}>
                <Container sx={{color:"#fff", marginTop:"2vh"}}>
                

                <Container sx={{justifyContent:"left", marginBottom:"5vh"}}>
                    <div className="logoDiv">
                        <img src={logo} style={{width:"10vw", marginTop:"1vh"}} alt="B Airways logo" className="logo" />
                    </div>
                    <Typography variant='h2' style={{color:"#fff"}}>
                        {booking.origin} <ArrowForwardIcon sx={{fontSize:"0.7em"}}/> {booking.destination}
                    </Typography>



                    <div style={{display:"flex", marginTop:"2vh"}}>
                        <div style={{flex: "33%"}}>
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
                                
                            </Typography>
                        </div>
                        <div style={{flex: "33%"}}>
                            <Typography variant='p'>
                            Departure : {removeTAndZ(booking.departure_time)}
                                <br/>
                                Arrival : {removeTAndZ(booking.arrival_time)}
                                <br/>
                            </Typography>
                        </div>
                        <div style={{flex: "33%"}}>
                        <Typography variant='p'>
                            Name : {booking.name}
                            <br/>
                            NIC : {booking.nic}
                            <br/>
                            Passport Id : {booking.passport_id} 
                            </Typography>
                        </div>
                    </div>


                    
                    
                </Container>

                </Container>
            </Box>
        </Container>
                
        </Container>
        <Container sx={{marginTop:'5vh', justifyContent:"center", display:"flex"}}>
            <Grid>
      
            {!isButtonHidden && (
                                <button 
                                    className="bttn bttnsignin"
                                    id="myButton"
                                    variant="contained"
                                    onClick={combineEvent}
                                    
                                >
                                    Print Ticket
                                </button>
                            )}
                
      
            </Grid>
        </Container>
        </div>
        </div>
        
        </>
    );
}