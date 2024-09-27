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

const LocationTable = () => {
    const [locations,
        setlocations] = useState([])

    useEffect(() => {
        const fetchALLModels = async() => {
            try {
                const res = await axios.get("http://localhost:8000/location")
                setlocations(res.data);
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchALLModels()
    }, [])


    const handleDelete = async(id) => {
        try {
            await axios.delete(`http://localhost:8000/location/`+id)
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


    const rows : GridRowsProp = locations.map(location => ({id: location.location_id, location_name: location.location_name, parent_location_id: location.parent_location_id }));

    const columns : GridColDef[] = [
        {
            field: 'id',
            headerName: 'Location ID',
            width: 200,
        }, {
            field: 'location_name',
            headerName: 'Location Name',
            width: 400,
        }, {
            field: 'parent_location_id',
            headerName: 'Parent Location ID',
            width:300,
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
                    href={`/location_update/`+params.row.id} >
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
                        {"Delete route instance?"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete Location instance? You might not be able to store it again.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={()=>handleDelete(params.row.id)} color="error" autoFocus>
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

                <h1>Locations
                    <Button
                        variant="contained"
                        href="/location_add"
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
export default LocationTable