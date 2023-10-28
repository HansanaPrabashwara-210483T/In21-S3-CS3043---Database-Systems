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

const Report_1_Results = () => {
    const [cus,
        setcus] = useState([])

    
    const location = useLocation()
    const flight_id = location.pathname.split("/")[2]

    useEffect(() => {
        const fetchALLModels = async() => {
            try {
                const res = await axios.get("http://localhost:8000/report_1/"+flight_id)
                setcus(res.data);
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchALLModels()
    }, [])

   


    const rows : GridRowsProp = cus.map(c => ({id: c.customer_id, name: c.name, address: c.address, nic:c.nic, p_id:c.passport_id,type: c.user_type, a_c: c.age_category}));

    const columns : GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.5
        }, {
            field: 'name',
            headerName: 'Name',
            flex: 1
        }, {
            field: 'address',
            headerName: 'Address',
            width: 250
        }, {
            field: 'nic',
            headerName: 'NIC',
            flex: 1
        }, {
            field: 'p_id',
            headerName: 'Passport ID',
            flex: 1
        }, {
            field: 'type',
            headerName: 'User Type',
            flex: 1
        }, {
            field: 'a_c',
            headerName: 'Age Category',
            flex: 1
        }
    ];

    return ( <>
    <Container>
     <Box component="main" sx={{ flexGrow: 1, paddingTop: 4.5 }}>
        
        
                 
        <Box component="main" sx={{ flexGrow: 1}}>
            <Grid>

                <h1>Passengers in Flight {flight_id} 
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
export default Report_1_Results