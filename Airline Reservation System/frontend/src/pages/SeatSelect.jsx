import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import NavBar from './Navbar'
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate, useLocation } from 'react-router-dom';
import {Button} from '@mui/material';
import axios from 'axios'
import {useState} from 'react'
import {useEffect} from 'react'
import EventSeatIcon from '@mui/icons-material/EventSeat';

export default function SeatSelect() {
    
    const [seats,
        setseats] = useState([]);

    const [CurrentSeat, setCurrentSeat] = useState();
    
    const location = useLocation()
    const navigate = useNavigate()

    const flight_id = location.pathname.split("/")[2]
    const customer_id = location.pathname.split("/")[3]


    useEffect((id) => {
        const fetchALLModels = async() => {
            try {
                const res = await axios.get("http://localhost:8000/seat_select/"+flight_id+"/"+customer_id)
                setseats(res.data);
                console.log(res);
            } catch (err) {
                console.log(err)
            }
        }
        fetchALLModels()
    }, [])
    
    const handleChange = (e) =>{
        setCurrentSeat((prev) => ({[e.target.name]: e.target.value}));
    };


    
    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            const res = await axios.post("http://localhost:8000/seat_select/"+CurrentSeat.seat_id+"/"+flight_id+"/"+customer_id);
            const booking_id = res.data.booking_id;
            navigate("/ticket/" + booking_id)
        }catch(err){
          console.log(err);
        }
    }
    

  return (<>< NavBar /> <Container>

  <Container>
      <Grid>

          <h1>Seat Select</h1>

      </Grid>
  </Container>

    <Container>
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-form-control-label-placement"
        name="seat_id"
        
      >
        {seats.map(seat => {
            if (seat.availability.data == 1) {
                return (
                    <FormControlLabel
                    flex={1}
                    sx={{width:"5vw", marginBottom:"2vw"}}
                        value={seat.seat_id}
                        control={<Radio icon={<EventSeatIcon />} checkedIcon={<EventSeatIcon/>}/>}
                        label={seat.seat_class + "-" + seat.seat_number}
                        labelPlacement="top"
                        onClick={handleChange}
                        
                    />
                );
            }else{
                return (
                    <FormControlLabel
                    sx={{width:"5vw", marginBottom:"2vw"}}
                        value={seat.seat_id}
                        control={<Radio disabled icon={<EventSeatIcon/>}/>}
                        label={seat.seat_class + "-" + seat.seat_number}
                        labelPlacement="top"
                    />
                );
            }
        })}
        
     
        
      </RadioGroup>
    </FormControl>
    </Container>

    <Container>

    </Container>
            <Button    type="submit"
              variant="contained"
              fullwidth
              sx={{ mt: 6,mb: 2,backgroundColor:"black", width:"50%" , float:"right", ":hover":{backgroundColor:"#36454F"}}}
              onClick={handleSubmit}
              >
                  Next
            </Button>
   
    </Container>
    </>
  );
}

