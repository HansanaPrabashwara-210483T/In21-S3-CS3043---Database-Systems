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

const UserTable = () => {
    const [users,
        setUsers] = useState([])

    useEffect(() => {
        const fetchALLModels = async() => {
            try {
                const res = await axios.get("http://localhost:8000/user_list")
                console.log(res.data)
                setUsers(res.data);
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchALLModels()
    }, [])


    const handleDelete = async(id) => {
        try {
            await axios.delete(`http://localhost:8000/user_list/`+id)
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


    const rows : GridRowsProp = users.map(user => ({id: user.user_id, username: user.username ,membership: user.membership,
    customer_id: user.customer_id,login_status: user.login_status.data, booking_count: user.num_bookings }));

    const columns : GridColDef[] = [
        {
            field: 'id',
            headerName: 'User ID',
            width: 100
        }, {
            field: 'username',
            headerName: 'Username',
            width: 250
        }, {
            field: 'membership',
            headerName: 'Memebership',
            width: 200,
            valueFormatter: (params) => {
                if(params.value == 'R') {return 'REGULAR';}
                else if (params.value == 'F'){ return 'FREQUENT';}
                else {return 'GOLD';}
            }
        }, {
            field: 'customer_id',
            headerName: 'Customer ID',
            width: 200
        }, {
            field: 'booking_count',
            headerName: 'Booking Count',
            width: 200
        },{
            field: 'login_status',
            headerName: 'Status',
            width: 100,
            valueFormatter: (params) => {
                if(params.value == 0) {return 'OFFLINE';}
                else {return 'ONLINE';}
            }
        }
    ];

    return ( <> <Box component="main" sx={{ flexGrow: 1, paddingTop: 4.5 }}>
        
        
                 
        <Box component="main" sx={{ flexGrow: 1}}>
            <Grid>

                <h1>Users
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
export default UserTable