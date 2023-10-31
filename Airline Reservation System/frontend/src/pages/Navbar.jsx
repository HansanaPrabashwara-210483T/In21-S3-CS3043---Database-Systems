import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logo from "../assets/logoNameSmall.png";
import { CgProfile } from "react-icons/cg";
const ResponsiveAppBar = () => {

    const navigate = useNavigate();

    // opening annd closing profile menu
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
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
                            <div>
                                <div className="profile" onClick={handleOpenUserMenu}>
                                    <CgProfile />
                                    <p style={{ whiteSpace: 'pre' }}>{localStorage.getItem('username')}</p>
                                </div>

                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleLogout} >
                                        <Typography textAlign="center" color="text.secondary">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </div>
                        </>
                    )}

                </ul>
            </div>
        </div>
    );
};

export default ResponsiveAppBar;
