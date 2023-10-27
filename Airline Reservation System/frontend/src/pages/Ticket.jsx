import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import NavBar from './Navbar'
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate, useLocation } from 'react-router-dom';
import {Button} from '@mui/material';
import axios from 'axios'
import {useState} from 'react'
import {useEffect} from 'react'


export default function Ticket() {
    return(
        <>< NavBar /> <Container>

        <Container>
            <Grid>
      
                <h1>Your Ticket</h1>
      
            </Grid>
        </Container>
      
          <Container>
          
          </Container>
      
          <Container>
      
          </Container>
                
          </Container>
          </>
    );
}