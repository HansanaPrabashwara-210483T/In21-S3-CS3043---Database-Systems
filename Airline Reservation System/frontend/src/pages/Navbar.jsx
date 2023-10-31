import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import HiveSharpIcon from '@mui/icons-material/HiveSharp';
import logo from "../assets/logoNameSmall.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import { SiConsul } from "react-icons/si";
// import { BsPhoneVibrate } from "react-icons/bs";
// import { AiOutlineGlobal } from "react-icons/ai";
// import { CgMenuGridO } from "react-icons/cg";

const ResponsiveAppBar = () => {

    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("customer_id");
        localStorage.removeItem("username");
        window.location.reload();
    }

    const handleBookingClick = (event) => {
        navigate('/booking');
    }
    const handleScheduleClick = (event) => {
        navigate('/shedule');
    }
    const handleHomeClick = (event) => {
        navigate('/');
    }
    const handleHelpClick = (event) => {
        navigate('/help');
    }
    const handleSignInClick = (event) => {
        navigate('/sign-in');
    }
    const handleSignUPClick = (event) => {
        navigate('/sign-up');
    }

    const [noBg, addBg] = useState("navBar");
    const addBgColor = () => {
        if (window.scrollY >= 10) {
            addBg("navBar navbar_With_Bg");
        } else {
            addBg("navBar");
        }
    };

    window.addEventListener("scroll", addBgColor);

    return (
        <div className={noBg}>
            <div className="logoDiv">
                <img src={logo} alt="B Airways logo" className="logo" />
            </div>
            <div className="navBarMenu">
                <ul className="menu flex">
                    <li className="listItem" onClick={handleHomeClick}>
                        Home
                    </li>
                    <li className="listItem" onClick={handleScheduleClick}>
                        Schedule
                    </li>
                    <li className="listItem" onClick={handleBookingClick}>
                        Booking
                    </li>
                    <li className="listItem" onClick={handleHelpClick}>
                        Help
                    </li>

                    {!localStorage.getItem("token")  && (
                        <>
                            <button className="bttn flex btnTwo" onClick={handleSignUPClick}>Sign Up</button>

                            <button className="bttn flex btnTwo" onClick={handleSignInClick}>Sign In</button>
                        </>
                    )}
                    {localStorage.getItem("token")  && (
                        <>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="A" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                            <p style={{ whiteSpace: 'pre' }}>{"   " + localStorage.getItem("username")}</p>
                        </>
                    )}

                </ul>
            </div>
        </div>
    );
};

export default ResponsiveAppBar;
