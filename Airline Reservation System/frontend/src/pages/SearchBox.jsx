import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import {experimentalStyled as styled} from '@mui/material/styles';

import NavBar from './Navbar'

function SearchBox() {
    const [age,
        setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark'
            ? '#1A2027'
            : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }));

    return ( <> <NavBar/><Container sx={{
        mt:'30vh'
    }}>

        <Grid
            container
            spacing={{
            xs: 0,
            md: 0
        }}
            columns={{
            xs: 4,
            sm: 8,
            md: 12
        }}
            elevation={0}
            component="form"
            noValidate
            autoComplete="off"
            sx={{
            borderRadius: 1,
            padding: 1.5,
            bgcolor: '#ffffff77',
            backdropFilter: 'blur(5px)',
            '& .MuiTextField-root': {
                m: 1,
                width: '25ch'
            }
        }}>
            {Array
                .from(Array(6))
                .map((_, index) => (
                    <Grid item xs={0} sm={4} md={4} key={index}>
                        <Item
                            sx={{
                            bgcolor: '#ffffff00',
                            padding: 0
                        }}
                            elevation={0}>
                            <FormControl
                                required
                                sx={{
                                m: 1,
                                minWidth: '22vw',
                                width: 'auto'
                            }}>
                                <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={age}
                                    label="Age *"
                                    onChange={handleChange}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                                {/* <FormHelperText>Required</FormHelperText> */}
                            </FormControl>
                        </Item>
                    </Grid>
                ))}
        </Grid>

        {/*
        <Paper
            elevation={0}
            component="form"
            sx={{
            borderRadius: 0,
            padding: 3,
            bgcolor: '#ffffff22',
            backdropFilter: 'blur(5px)',
            '& .MuiTextField-root': {
                m: 1,
                width: '25ch'
            }
        }}
            noValidate
            autoComplete="off">

            <div>

                <div>
                    <FormControl
                        required
                        sx={{
                        m: 1,
                        minWidth:'25vw',
                        width: 'auto'

                    }}>
                        <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={age}
                            label="Age *"
                            onChange={handleChange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>

                    <FormControl
                        required
                        sx={{
                        m: 1,
                        minWidth:'25vw',

                        width: 'auto'

                    }}>
                        <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={age}
                            label="Age *"
                            onChange={handleChange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>

                    <FormControl
                        required
                        sx={{
                        m: 1,
                        minWidth:'25vw',

                        width: 'auto'
                    }}>
                        <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={age}
                            label="Age *"
                            onChange={handleChange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>

                    <FormControl
                        required
                        sx={{
                        m: 1,
                        minWidth:'25vw',

                        width: 'auto'

                    }}>
                        <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={age}
                            label="Age *"
                            onChange={handleChange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
                </div>

            </div>

        </Paper> */}
    </Container> </>

    );
}

export default SearchBox;