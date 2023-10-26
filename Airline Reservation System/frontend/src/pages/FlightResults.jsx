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

    const originalAirport = location.pathname.split("/")[2]
    const targetAirport = location.pathname.split("/")[3]
    const departure_time = location.pathname.split("/")[4]
    const arrival_time = location.pathname.split("/")[5]

    useEffect(() => {
        const fetchALLModels = async() => {
            try {
                const res = await axios.get("http://localhost:8000/route/available_flights/"+originalAirport+"/"+targetAirport+"/"+departure_time+"/"+arrival_time)
                setResults(res.data);
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchALLModels()
    }, [])


    const handleDelete = async(id) => {
        try {
            await axios.delete(`http://localhost:8000/aircraft/`+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const rows : GridRowsProp = Results.map(Result => ({aircraftName: Result.call_sign, originAirport:Result.originAirport, targetAirport:Result.targetAirport, departureTime:Result.departure_time, arrivalTime:Result.arrival_time,
        flightStatus:Result.status, delayStatus:Result.delay}));

    const columns : GridColDef[] = [
        {
            field: 'aircraftName',
            headerName: 'Aircraft Name',
            width: 200
        }, {
            field: 'originAirport',
            headerName: 'Origin',
            width: 200
        }, {
            field: 'targetAirport',
            headerName: 'Target',
            width: 200
        }, {
            field: 'departureTime',
            headerName: 'Departure Time',
            width: 200
        }, {
            field: 'arrivalTime',
            headerName: 'Arrival Time',
            width: 200
        }, {
            field: 'flightStatus',
            headerName: 'Flight Status',
            width: 100
        },{
            field: 'delayStatus',
            headerName: 'Delay Status',
            width: 100
        }
    ];

    return ( <> <Box component="main" sx={{ flexGrow: 1, paddingTop: 4.5 }}>



            <Box component="main" sx={{ flexGrow: 1}}>
                <Grid>

                    <h1>Aircrafts
                        <Button
                            variant="contained"
                            href="/aircraft_add"
                            style={{
                                float: 'right',
                                backgroundColor: '#000000'
                            }}>Add</Button>
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
                                    pageSize: 8
                                }
                            }
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick/>


                </Box>

            </div>

        </Box>

        </>
    )
}
export default FlightResultsTable