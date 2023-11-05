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

const DelayTable = () => {
    const [flights,
        setflights] = useState([])

    useEffect(() => {
        const fetchALLModels = async() => {
            try {
                const res = await axios.get("http://localhost:8000/delay")
                setflights(res.data);
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchALLModels()
    }, [])



    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const removeTAndZ = (dateString) => {
        const [date, time] = dateString.split(/T|Z/);
        const [t,sec] = time.split(".")
        const [h,m,s] = t.split(":")
        return date + " | " + h + " : " + m;
    };


    const rows : GridRowsProp = flights.map(flight => ({id: flight.flight_id, route_id: flight.route_id ,aircraft_id: flight.aircraft_id,
        departure_time: removeTAndZ(flight.departure_time), arrival_time: removeTAndZ(flight.arrival_time), status: flight.status, delay: flight.delay.data}));
    
    const columns : GridColDef[] = [
        {
            field: 'id',
            headerName: 'Flight ID',
            width: 100
        }, {
            field: 'route_id',
            headerName: 'Route ID',
            width: 100
        }, {
            field: 'aircraft_id',
            headerName: 'Aircraft ID',
            width: 100
        },{
            field: 'status',
            headerName: 'Status',
            width: 130
        },{
            field: 'delay',
            headerName: 'Delay',
            width: 130,
            valueFormatter: (params) => {
                if (params.value == 1) {
                    return "DELAYED"
                }else{
                    return "NOT DELAYED"
                }
              }
        },{
            field: 'departure_time',
            headerName: 'Depature Time',
            width: 150
        },{
            field: 'departure_delay',
            headerName: '',
            width: 150,
            sortable: false,
            disableClickEventBubbling: true,
            
            renderCell: (params) => {
                return (
                  <Stack direction="row" spacing={2}>
                    <Button  color="error"   size="small" 
                    href={`/delay_departure/`+params.row.id} >
                        Delay Departure
                    </Button>
                  </Stack>
                );
            },
          },{
            field: 'arrival_time',
            headerName: 'Arrival Time',
            width: 150
        },{
            field: 'arrival_delay',
            headerName: '',
            width: 150,
            sortable: false,
            disableClickEventBubbling: true,
            
            renderCell: (params) => {
                return (
                  <Stack direction="row" spacing={2}>
                    <Button  color="error"   size="small" 
                    href={`/delay_arrival/`+params.row.id} >
                        Delay Arrival
                    </Button>
                  </Stack>
                );
            },
          }
    ];

    return ( <> <Box component="main" sx={{ flexGrow: 1, paddingTop: 4.5 }}>
        
        
                 
        <Box component="main" sx={{ flexGrow: 1}}>
            <Grid>

                <h1>Flight Delay
                    
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

export default DelayTable