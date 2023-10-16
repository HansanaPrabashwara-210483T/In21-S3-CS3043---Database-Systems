// Show all flight shedules in next 24 h

import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import NavBar from './Navbar'
import {Container, Box} from '@mui/material'
import Button from '@mui/material/Button';
import {DataGrid, GridRowsProp, GridColDef} from '@mui/x-data-grid';
import {Stack} from '@mui/material'

import Grid from '@mui/material/Grid';

const Aircraft = () => {
    const [models,
        setmodels] = useState([])

    useEffect(() => {
        const fetchALLModels = async() => {
            try {
                const res = await axios.get("http://localhost:8000/shedule")
                setmodels(res.data);
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchALLModels()
    }, [])

    const rows : GridRowsProp = models.map(model => ({id: model.call_sign, origin: model.origin, destination: model.destination, depature: model.departure_time, status:model.status, delay:model.delay.data}));

    const columns : GridColDef[] = [
        {
            field: 'id',
            headerName: 'Aircraft',
            width: 100
        }, {
            field: 'origin',
            headerName: 'Origin',
            width: 100
        }, {
            field: 'destination',
            headerName: 'Destination',
            width: 100
        }, {
            field: 'depature',
            headerName: 'Depature Time',
            width: 250
        },{
            field: 'status',
            headerName: 'Status',
            width: 150
        },{
            field: 'delay',
            headerName: 'Delay',
            width: 100,
            valueFormatter: (params) => {
                return params.value.data ? 'Delay' : 'No Delay';
              }
        },
        
    
    ];

    return ( <>< NavBar /> <Container>

        <Container>
            <Grid>

                <h1>Flight Shedule
                
                </h1>

            </Grid>
        </Container>

        <div className="models">

            <Box
                sx={{
                height: 400,
                width: '100%'
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
                    
                    disableRowSelectionOnClick/>
            </Box>

        </div>

    </Container> </>
  )
}
export default Aircraft