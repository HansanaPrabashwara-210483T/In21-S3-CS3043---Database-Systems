import React, { useState } from "react";
import { SiConsul } from "react-icons/si";
import { BsPhoneVibrate } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";

import logo from "../assets/logoNameSmall.png";

const Navbar = () => {
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
          <li className="listItem">
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
