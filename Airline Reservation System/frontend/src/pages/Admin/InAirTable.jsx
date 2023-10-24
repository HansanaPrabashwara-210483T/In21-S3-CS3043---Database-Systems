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

const InAirTable = () => {
    const [inAir,
        setInAir] = useState([])

    useEffect(() => {
        const fetchALLModels = async() => {
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
                const res = await axios.get("http://localhost:8000/in_air")
                setInAir(res.data);
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

    const removeTAndZ = (dateString) => {
        const [date, time] = dateString.split(/T|Z/);
        const [t,sec] = time.split(".")
        const [h,m,s] = t.split(":")
        return date + " | " + h + " : " + m;
    };


    const rows : GridRowsProp = inAir.map(flight => ({id: flight.flight_id, route_id: flight.route_id ,aircraft_id: flight.aircraft_id,
        departure_time: removeTAndZ(flight.departure_time), arrival_time: removeTAndZ(flight.arrival_time), status: flight.status, delay: flight.delay.data}));
    
    const columns : GridColDef[] = [
        {
            field: 'id',
            headerName: 'Flight ID',
            headerClassName: 'tableHeader',
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
            field: 'departure_time',
            headerName: 'Depature Time',
            width: 200
        },{
            field: 'arrival_time',
            headerName: 'Arrival Time',
            width: 200
        },{
            field: 'status',
            headerName: 'Status',
            width: 130
        },{
            field: 'delay',
            headerName: 'Delay',
            width: 130,
            valueFormatter: (params) => {
                return params.value.data ? 'DELAY' : 'NO DELAY';
              }
        }, {
            field: 'edit',
            headerName: '',
            width: 100,
            sortable: false,
            disableClickEventBubbling: true,
            
            renderCell: (params) => {
                return (
                  <Stack direction="row" spacing={2}>
                    <Button  color="primary"   size="small" 
                    href={`/flight_update/`+params.row.id} >
                        Update
                    </Button>
                  </Stack>
                );
            },
          },{
            field: 'delete',
            headerName: '',
            width: 100,
            sortable: false,
            disableClickEventBubbling: true,
            
            renderCell: (params) => {
                return (
                  <Stack direction="row" spacing={2}>
                    
                    {/* <Button variant="outlined" color="warning" size="small" href=''>Edit</Button> */}
                    <Button  color="error"  size="small"   onClick={handleClickOpen}>Delete</Button>
                    {/* ()=>handleDelete(params.row.id) */}
                    
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                    <DialogTitle id="responsive-dialog-title">
                        {"Delete airport instance?"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete airport instance? You might not be able to restore it again.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={()=>handleDelete(params.row.id)} color="error"  autoFocus>
                            Delete
                        </Button>
                        </DialogActions>
                    </Dialog>

                  </Stack>
                );
            },
          }
    ];

    return ( <> <Box component="main" sx={{ flexGrow: 1, paddingTop: 4.5 }}>
        
        
                 
        <Box component="main" sx={{ flexGrow: 1}}>
            <Grid>
            <h1>Dashboard</h1>
                <h2>Currently In Air
                </h2>

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
export default InAirTable