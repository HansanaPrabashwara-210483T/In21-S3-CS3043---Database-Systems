import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useEffect} from 'react'
import {Container, Box} from '@mui/material'
import Button from '@mui/material/Button';
import {DataGrid, GridRowsProp, GridColDef} from '@mui/x-data-grid';
import {Stack} from '@mui/material'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import {useLocation, useNavigate} from "react-router-dom";
import NavBar from './Navbar'


const FlightResultsTable = () => {
    const [Results,
        setResults] = useState([])

    const location = useLocation();

    const originAirport = location.pathname.split("/")[3]
    const targetAirport = location.pathname.split("/")[4]
    const departure_time = location.pathname.split("/")[5]
    const arrival_time = location.pathname.split("/")[6]
    console.log("original airport.....", originAirport)
    console.log("destination airport..", targetAirport)
    console.log("d_time.....", departure_time)
    console.log("a_time.....", arrival_time)

    const buttonClick = () => {
        const existing_token = localStorage.getItem("token");
        console.log(existing_token);
        var href = '';
        if (existing_token) {
            href = "/user_booking_type";
        } else {
            href = "/login_for_booking";
        }

        console.log(href);
    }

    useEffect(() => {
        const fetchFlightResults = async () => {
            try{
                await axios.post("http://localhost:8000/boarding")
            }catch(err){
                console.log(err)
            }
            try{
                await axios.post("http://localhost:8000/in_air")
            }catch(err){
                console.log(err)
            }
            try{
                await axios.put("http://localhost:8000/in_air")
            }catch(err){
                console.log(err)
            }
            try {
                const res = await axios.get('http://localhost:8000/route/available_flights/'+originAirport+'/'+targetAirport+'/'+departure_time+'/'+arrival_time);
                setResults(res.data);
            } catch (error) {
                console.error("Error fetching flight results:", error);
            }
        }
        fetchFlightResults();
    }, [originAirport, targetAirport, departure_time, arrival_time]);

    const removeTAndZ = (dateString) => {
        const [date, time] = dateString.split(/T|Z/);
        const [t,sec] = time.split(".")
        const [h,m,s] = t.split(":")
        return date + " | " + h + " : " + m;
    };

    const theme = useTheme();
    const navigate = useNavigate();

    // here i removed mapping on originAirport and targetAirport and used initially declared variables due to cells not rendering
    const rows : GridRowsProp = Results.map(Result => ({id: Result.flight_id ,aircraftName: Result.call_sign, originAirport, targetAirport, departureTime:removeTAndZ(Result.departure_time), arrivalTime:removeTAndZ(Result.arrival_time),
        flightStatus:Result.status}));
    console.log(Results)

    const columns : GridColDef[] = [
        {
            field: 'aircraftName',
            headerName: 'Aircraft Name',
            flex: 1
        }, {
            field: 'originAirport',
            headerName: 'Origin Airport',
            flex: 1.5
        }, {
            field: 'targetAirport',
            headerName: 'Destination Airport',
            flex: 1.5
        }, {
            field: 'departureTime',
            headerName: 'Departure Time',
            flex: 2
        }, {
            field: 'arrivalTime',
            headerName: 'Arrival Time',
            flex: 2
        }, {
            field: 'flightStatus',
            headerName: 'Flight Status',
            flex: 1
        },{
            field: 'id',
            headerName: '',
            flex: 2,
            renderCell: (params) => (
                
                <Stack direction="row" spacing={2}>
                    {/* // If user is not authenticated */}
                    
                    {/* <Button variant="contained" color="success" href={"/login_for_booking/"+params.value}>Book Now</Button> */}
                
                {/* // if user is authenticated */}
                
                    {/* <Button variant="contained" color="success" href={"/user_booking_type/"+params.value}>Book Now</Button> */}
                    <Button variant="contained" color="success" onClick={()=>{
                        if(localStorage.getItem("token")){
                            navigate("/user_booking_type/"+ params.value)
                        }else{
                            navigate("/login_for_booking/"+params.value)
                        }
                    }}>Book Now</Button>

                </Stack>
            )
        }
    ];

    return ( <> 
    <NavBar />
    <Container sx={{paddingTop:25}}>
    <Box component="main" sx={{ flexGrow: 1, paddingTop: 4.5 }}>

            

            <Box component="main" sx={{ flexGrow: 1}}>
                <Grid>

                    <h1>Available Flights</h1>

                </Grid>
            </Box>

            <div className="models">

                <Box
                    sx={{
                        width: '100%',
                        marginTop: '5vh'

                    }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={(row) => row.aircraftName}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 8
                                }
                            }
                        }}
                        pageSizeOptions={[5]}
                        />

                </Box>
            </div>
        </Box>
        </Container>
        </>
    )
}
export default FlightResultsTable