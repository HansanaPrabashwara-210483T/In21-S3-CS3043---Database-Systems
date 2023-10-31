import React, { useState } from "react";
import logo from "../assets/logoNameSmall.png";
// import { SiConsul } from "react-icons/si";
// import { BsPhoneVibrate } from "react-icons/bs";
// import { AiOutlineGlobal } from "react-icons/ai";
// import { CgMenuGridO } from "react-icons/cg";

const pages = ['Booking','Schedule', 'Help'];
const urls = ['/booking', '/shedule','/help']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {

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
                    <li className="listItem" onClick={handleOpenNavMenu}>
                        Home
                    </li>
                    <li className="listItem">
                        Schedule
                    </li>
                    <li className="listItem">
                        Book
                    </li>
                    <li className="listItem">
                        About
                    </li>
                    <button className="bttn flex btnTwo">Contact</button>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
