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

const AirportTable = () => {
    const [airports,
        setmodels] = useState([])

    useEffect(() => {
        const fetchALLModels = async() => {
            try {
                const res = await axios.get("http://localhost:8000/airport")
                setmodels(res.data);
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchALLModels()
    }, [])


    const handleDelete = async(id) => {
        try {
            await axios.delete(`http://localhost:8000/airport/`+id)
            // console.log(id)
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


    const rows : GridRowsProp = airports.map(airport => ({id: airport.airport_code, name: airport.name ,location_id: airport.location_id}));

    const columns : GridColDef[] = [
        {
            field: 'id',
            headerName: 'Airport Code',
            width: 200
        }, {
            field: 'name',
            headerName: 'Airport Name',
            width: 500
        }, {
            field: 'location_id',
            headerName: 'Location ID',
            width: 250
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
                    href={`/airport_update/`+params.row.id} >
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

                <h1>Airport
                    <Button
                        variant="contained"
                        href="/airport_add"
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
export default AirportTable