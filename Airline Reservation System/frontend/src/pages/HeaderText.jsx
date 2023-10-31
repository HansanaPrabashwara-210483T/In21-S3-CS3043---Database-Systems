import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

function HeaderText() {

    return ( <> 
        <Container
            sx={{
            display: 'flex',
            alignItems: 'center', 
            // justifyContent: 'center',
            padding: 5, 
            }}>
            <Typography
                variant="h1"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                mt: '10vh',
                mr: 2,
                display: {
                    xs: 'none',
                    md: 'flex'
                },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.0rem',
                color: 'inherit',
                textDecoration: 'none',
                color: '#fff'
            }}>
                Your Journey
                <br/>
                Begins Here
            </Typography>

        </Container>
    
    
    
   
        <Container
            sx={{
            // display: 'flex',
            alignItems: 'center', 
            justifyContent: 'center',
            padding: 5 }}>
        {!localStorage.getItem("token") && ( 
        <>     
        <Button variant="contained" color="primary" size="large" sx={{margin:'2vh', backgroundColor:'#000000', padding:'3vh'}} endIcon= {<ArrowForwardIcon/>} href='booking'>
        &nbsp;Book a Flight&nbsp;
        </Button>

        <Button variant="contained" color="primary" size="large" sx={{margin:'2vh', backgroundColor:'#000000', padding:'3vh'}} endIcon={<PersonAddAltIcon/>} href='sign-up'>
        &nbsp;Sign Up&nbsp;
        </Button>
        </>
        )}

        {localStorage.getItem("token") && ( 
        <>     
        <Button variant="contained" color="primary" size="large" sx={{margin:'2vh', backgroundColor:'#000000', padding:'3vh'}} endIcon= {<ArrowForwardIcon/>} href='booking'>
        &nbsp;Book a Flight&nbsp;
        </Button>

        </>
        )}
        </Container>
     </>

    );
}

export default HeaderText;