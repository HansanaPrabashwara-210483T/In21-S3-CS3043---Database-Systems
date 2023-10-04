import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './Navbar'
import { Container } from '@mui/material' 
import Button from '@mui/material/Button';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

import Grid from '@mui/material/Grid';
 

const Aircraft = () => {
  const [models, setmodels] = useState([])

  useEffect(()=> {
  const fetchALLModels = async ()=>{
    try{
      const res = await axios.get("http://localhost:8000/aircraft")
      setmodels(res.data);
      console.log(res)
    }catch(err){
      console.log(err)
    }
  }
  fetchALLModels()
},[])



  // const rows: GridRowsProp = [
  //   models.map(model=>(
  //       {id: model.aircraft_id, model_id: model.model_id, call_sign: model.call_sign, valid: models.valid}
  //   ))
  //   // { id: 1, col1: 'Hello', col2: 'World' },
  //   // { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  //   // { id: 3, col1: 'MUI', col2: 'is Amazing' },
  // ];

  const rows: GridRowsProp = models.map(model => ({
    id: model.aircraft_id,
    model_id: model.model_id,
    call_sign: model.call_sign,
    valid: model.valid,
  }));

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Aircraft ID', width: 250 },
    { field: 'model_id', headerName: 'Model ID', width: 250 },
    { field: 'call_sign', headerName: 'Call Sign', width: 250 },
    { field: 'valid', headerName: 'Valid', width: 250 },
  ];

  return (
    <><NavBar />
      <Container>

        <Container>
          <Grid>
           
            <h1>Aircrafts <Button variant="contained" href="/aircract_add" style={{float:'right', backgroundColor:'#000000'}}>Add</Button></h1>
           
            
            
          </Grid>
        </Container>
{/* 
    <div className="page_heading">
      <Row>
      <Col><h1>Aircraft</h1></Col>
      <Col><Button variant="dark" href="/aircract_add" style={{float:'right'}}>Add</Button></Col>
      </Row>
    </div>
         */}
      
      <div className="models">
      {/* <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Number of Seats</th>
          <th>Number of Economy Seats</th>
          <th>Number of Business Seats</th>
          <th>Number of Platinum Seats</th>
        </tr>
      </thead>
      <tbody>
        {models.map(model=>(
        <tr className="model" key={model.model_id}>
          <td>{model.model_id}</td>
          <td>{model.brand}</td>
          <td>{model.model}</td>
          <td>{model.economy_seats+model.business_seats+model.platinum_seats}</td>
          <td>{model.economy_seats}</td>
          <td>{model.business_seats}</td>
          <td>{model.platinum_seats}</td>
        </tr>
        ))}
        </tbody>
        </Table> */}

        
<div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>

      </div>
      
      </Container>

    </>
  )
}
export default Aircraft