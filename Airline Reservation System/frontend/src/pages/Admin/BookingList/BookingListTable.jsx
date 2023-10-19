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

const BookingListTable = () => {
    const [bookings,setmodels] = useState([])

    useEffect(() => {
        const fetchALLModels = async() => {
            try {
                const res = await axios.get("http://localhost:8000/booking_list")
                setmodels(res.data);
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchALLModels()
    }, [])


    const handleInvalidate = async(id) => {
        try {
            await axios.delete(`http://localhost:8000/booking_list/`+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    const handleValidate = async(id) => {
        try {
            await axios.put(`http://localhost:8000/booking_list/`+id)
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


    const rows : GridRowsProp = bookings.map(booking => ({id: booking.booking_id, customer_id:booking.customer_id, flight_id: booking.flight_id
        ,seat_id : booking.seat_id, status: booking.payment_status.data, price : booking.total_cost ,payment_proceed: booking.payment_status.data
    }));

    const columns : GridColDef[] = [
        {
            field: 'id',
            headerName: 'Booking ID',
            width: 100
        },{
            field: 'customer_id',
            headerName: 'Customer ID',
            width: 100
        },{
            field: 'flight_id',
            headerName: 'Flight ID',
            width: 100
        },{
            field: 'status',
            headerName: 'Payment Status',
            width: 200,
            valueFormatter: (params) => {
                if(params.value == true) {return 'VALIDATED';}else{ return 'PROCEEDING';}
            }
        },{
            field: 'seat_id',
            headerName: 'Seat ID',
            width: 200,
            
        },{
            field: 'price',
            headerName: 'Price',
            width: 200
        },{
            field: 'payment_proceed',
            headerName: '',
            width: 100,
            sortable: false,
            disableClickEventBubbling: true,
            
            renderCell: (params) => {
                console.log(params)
                return (
                  <Stack direction="row" spacing={2}>
                    
                    {/* <Button variant="outlined" color="warning" size="small" href=''>Edit</Button> */}
                    <Button color ={params.value == 0 ? 'success' : 'error'}  size="small"   onClick={handleClickOpen}>{params.value == 1 ? 'Invalidate' : 'validate'}</Button>
                    {/* ()=>handleDelete(params.row.id) */}
                    
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                    <DialogTitle id="responsive-dialog-title">
                        {"Delete  instance?"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Are you sure you want to {params.value == 0 ? 'validate' : 'invalidate'} this booking instance?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={params.value === 0 ? ()=>handleInvalidate(params.id) : ()=>handleValidate(params.id)} color={params.value === 0 ? 'error' : 'success'}  autoFocus>
                            {params.value === 0 ? 'success' : 'error'}
                        </Button>
                        </DialogActions>
                    </Dialog>

                  </Stack>
                );
            },
          }
    ];
    // {()=>handleDelete(params.row.id)}
    return ( <> <Box component="main" sx={{ flexGrow: 1, paddingTop: 4.5 }}>
        
        
                 
        <Box component="main" sx={{ flexGrow: 1}}>
            <Grid>

                <h1>Bookings
                    {/* <Button
                        variant="contained"
                        href="/aircraft_add"
                        style={{
                        float: 'right',
                        backgroundColor: '#000000'
                    }}>Add</Button> */}
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
export default BookingListTable