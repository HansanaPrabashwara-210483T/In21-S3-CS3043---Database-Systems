import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import NavBar from './Navbar'
import {Container, Box} from '@mui/material'
import Button from '@mui/material/Button';
import {DataGrid, GridRowsProp, GridColDef} from '@mui/x-data-grid';

import Grid from '@mui/material/Grid';

const Aircraft = () => {
    const [models,
        setmodels] = useState([])

    useEffect(() => {
        const fetchALLModels = async() => {
            try {
                const res = await axios.get("http://localhost:8000/aircraft")
                setmodels(res.data);
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchALLModels()
    }, [])

    const rows : GridRowsProp = models.map(model => ({id: model.aircraft_id, model_id: model.model_id, call_sign: model.call_sign, valid: model.valid}));

    const columns : GridColDef[] = [
        {
            field: 'id',
            headerName: 'Aircraft ID',
            width: 250
        }, {
            field: 'model_id',
            headerName: 'Model ID',
            width: 250
        }, {
            field: 'call_sign',
            headerName: 'Call Sign',
            width: 250
        }, {
            field: 'valid',
            headerName: 'Valid',
            width: 250
        }
    ];

    return ( <>< NavBar /> <Container>

        <Container>
            <Grid>

                <h1>Aircrafts
                    <Button
                        variant="contained"
                        href="/aircract_add"
                        style={{
                        float: 'right',
                        backgroundColor: '#000000'
                    }}>Add</Button>
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
                            pageSize: 25
                        }
                    }
                }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick/>
            </Box>

        </div>

    </Container> </>
  )
}
export default Aircraft