import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useEffect} from 'react'
import {Container, Box} from '@mui/material'
import Button from '@mui/material/Button';
import {DataGrid, GridRowsProp, GridColDef} from '@mui/x-data-grid';
import {Stack} from '@mui/material'
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const Report_2_Results = () => {
    const [visit_data,setVisit] = useState([]);
    const [isButtonHidden, setIsButtonHidden] = useState(false);



    
    const location = useLocation()
    const ariport_id = location.pathname.split("/")[2]
    const start_date = location.pathname.split("/")[3]
    const end_date = location.pathname.split("/")[4]

    useEffect(() => {
        const fetchALLModels = async() => {
            try {
                const res = await axios.get("http://localhost:8000/report_2/"+ariport_id+"/"+start_date+"/"+end_date)
                setVisit(res.data);
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchALLModels()
    }, [])

    const removeTAndZ = (dateString) => {
        const [date, time] = dateString.split(/T|Z/);
        const [t,sec] = time.split(".")
        const [h,m,s] = t.split(":")
        return date + "  -  " + h + " : " + m;
    };

    {visit_data.map((data, index) => (
        <div key={index}>
            <h3>{data.name}</h3>
            <p>{data.count}</p>
        </div>
    ))}
   
    const printPage = () => {
        window.print();
    };

    const combineEvent = () => {
        setIsButtonHidden(true);
        setTimeout(() => {
            printPage();
        }, 50); 
        setTimeout(() => {
            setIsButtonHidden(false);
        }, 1000); 
    };
    return ( <>
    <Container>
     <Box component="main" sx={{ flexGrow: 1, paddingTop: 4.5 }}>
        
        
                 
        <Box component="main" sx={{ flexGrow: 1}}>
            <Grid>

                <h1>Passengers Visited {ariport_id} 
                {!isButtonHidden && (
                                <Button
                                    id="myButton"
                                    variant="contained"
                                    onClick={combineEvent}
                                    style={{
                                        float: 'right',
                                        backgroundColor: '#000000'
                                    }}
                                >
                                    Print Report
                                </Button>
                            )}
                </h1>


                <Container sx={{marginTop:"10vh"}}>
                    <Stack spacing={1} direction="row">
                        <h3>Airport Code:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ariport_id}</h3>
                    </Stack>
                    <Stack spacing={1} direction="row">
                        <h3>Airport Name:&nbsp;&nbsp;&nbsp;
                            {visit_data.map((data, index) => (
                                <span key={index}>
                                    {data.name}
                                </span>
                            ))}
                        </h3>
                    </Stack>
                    <Stack spacing={1} direction="row">
                        <h3>From:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ removeTAndZ(start_date)}</h3>
                    </Stack>
                    <Stack spacing={1} direction="row">
                        <h3>To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{removeTAndZ(end_date)}</h3>
                    </Stack>
                </Container>
                <Container sx={{marginTop:"10vh", justifyContent:'center'}}>
                    <Box textAlign={'center'} >
                        <h2>Number of Passengers</h2>
                        {visit_data.map((data, index) => (
                                <Typography component = "h1" variant = "h1" key={index}>
                                    {data.count}
                                </Typography>
                        ))}
                    </Box>
                </Container>
                    

            </Grid>
        </Box>

        <div className="models">

            <Box
                sx={{
                width: '100%',
                marginTop: '5vh'
                
            }}>
                

                    
            </Box>

        </div>

        </Box> 
    </Container>
    </>
  )
}
export default Report_2_Results