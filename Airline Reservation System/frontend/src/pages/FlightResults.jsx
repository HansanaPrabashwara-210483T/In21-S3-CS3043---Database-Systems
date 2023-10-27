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
import {useLocation} from "react-router-dom";

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

    useEffect(() => {
        const fetchFlightResults = async () => {
            try {
                const res = await axios.get('http://localhost:8000/route/available_flights/'+originAirport+'/'+targetAirport+'/'+departure_time+'/'+arrival_time);
                setResults(res.data);
            } catch (error) {
                console.error("Error fetching flight results:", error);
            }
        }
        fetchFlightResults();
    }, [originAirport, targetAirport, departure_time, arrival_time]);


    const theme = useTheme();

    // here i removed mapping on originAirport and targetAirport and used initially declared variables due to cells not rendering
    const rows : GridRowsProp = Results.map(Result => ({aircraftName: Result.call_sign, originAirport, targetAirport, departureTime:Result.departure_time, arrivalTime:Result.arrival_time,
        flightStatus:Result.status}));
    console.log(Results)

    const columns : GridColDef[] = [
        {
            field: 'aircraftName',
            headerName: 'Aircraft Name',
            width: 200
        }, {
            field: 'originAirport',
            headerName: 'Origin Airport',
            width: 200
        }, {
            field: 'targetAirport',
            headerName: 'Destination Airport',
            width: 300
        }, {
            field: 'departureTime',
            headerName: 'Departure Time',
            width: 300
        }, {
            field: 'arrivalTime',
            headerName: 'Arrival Time',
            width: 200
        }, {
            field: 'flightStatus',
            headerName: 'Flight Status',
            width: 200
        }
    ];

    return ( <> <Box component="main" sx={{ flexGrow: 1, paddingTop: 4.5 }}>



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
        </>
    )
}
export default FlightResultsTable