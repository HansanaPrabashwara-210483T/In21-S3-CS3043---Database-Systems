import React from 'react'
import NavBar from './Navbar'
import SearchBox from './SearchBox'
import HeaderText from './HeaderText'
import Container from '@mui/material/Container';
import {Box} from '@mui/material';
import front from '../media/front_image_2.jpg';


export default function Home() {
    // const imageURL =
    // "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&
    // i
    // xid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop
    // & w=2074&q=80";
    return (<> <Box
        component="div"
        sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${front})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.4)',
        zIndex: '-100'
    }}/> 
      < NavBar /> 
      <HeaderText/>
      {/* <SearchBox/>  */}
    < Box /> 

   
    </>
    );
}