import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useEffect} from 'react'
import {Container, Box} from '@mui/material'
import Button from '@mui/material/Button';
import {DataGrid, GridRowsProp, GridColDef} from '@mui/x-data-grid';
import {Stack} from '@mui/material'
import { useLocation } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const Report_5_Results = () => {
    const [flights,
        setFlights] = useState([])

    
    const location = useLocation()
    const origin = location.pathname.split("/")[2]
    const destination = location.pathname.split("/")[3]

    useEffect(() => {
        const fetchALLModels = async() => {
            try{
                await axios.post("http://localhost:8000/boarding")
                await axios.post("http://localhost:8000/in_air")
            }catch(err){
                console.log(err)
            }
            try {
                const res = await axios.get("http://localhost:8000/report_4/"+origin+"/"+destination)
                setFlights(res.data);
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchALLModels()
    }, [])

    const removeTAndZ = (dateString) => {
        const [date, time] = dateString.split(/T|Z/);
        const [t,sec] = time.split(".")
        const [h,m,s] = t.split(":")
        return date + " | " + h + " : " + m;
    };



    const rows = flights.map(flight => ({
        id: flight.flight_id,
        aircraft: flight.call_sign,
        departure_time: removeTAndZ(flight.departure_time),
        arrival_time: removeTAndZ(flight.arrival_time),
        delay: flight.delay.data,
        passenger_count: flight.total_booking_amount
    }));
    
    const columns : GridColDef[] = [
        {
            field: 'id',
            headerName: 'Flight ID',
            flex: 1
        }, {
            field: 'aircraft',
            headerName: 'Aircraft',
            flex: 1
        },{
            field: 'departure_time',
            headerName: 'Depature Time',
            flex: 1
        },{
            field: 'arrival_time',
            headerName: 'Arrival Time',
            flex: 1
        },{
            field: 'delay',
            headerName: 'Status',
            flex: 1,
            valueFormatter: (params) => {
                if (params.value == 1) {
                    return "DELAYED"
                }else{
                    return "NOT DELAYED"
                }
              }
        },{
            field: 'passenger_count',
            headerName: 'Passenger Count',
            flex: 1
        }
    ];

    return ( <>
    <Container>
     <Box component="main" sx={{ flexGrow: 1, paddingTop: 4.5 }}>
        
        
                 
        <Box component="main" sx={{ flexGrow: 1}}>
            <Grid>

                <h1>Past Flights From {origin} to {destination}
                    <Button
                        variant="contained"
                        onClick={() => window.print()}
                        style={{
                        float: 'right',
                        backgroundColor: '#000000'
                    }}>Print Report</Button>
                </h1>

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
                    initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 100
                        }
                    }
                }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick/>

                    
            </Box>

        </div>

        </Box> 
    </Container>
    </>
  )
}
export default Report_5_Results