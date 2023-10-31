import React from "react";
import logo from "../assets/logoNameSmall.png";
import { useNavigate } from "react-router-dom";
import { TiSocialFacebook } from "react-icons/ti";
import { AiOutlineTwitter } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

function Footer() {
  return (
    <div className="footer">
      <div className="sectionContainer container grid">
        <div className="gridOne">
          <a href="Home">
            <img src={logo} alt="logo" className="logoDiv" />
          </a>

          <div className="socialIcon flex">
            <TiSocialFacebook className="icon" />
            <AiOutlineTwitter className="icon" />
            <AiOutlineInstagram className="icon" />
            <MdEmail className="icon" />
          </div>
        </div>{" "}
        <div className="footerLinks">
          <span className="linkTitle">Information</span>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/shedule">Schedule</a>
          </li>
          <li>
            <a href="/booking">Booking</a>
          </li>
          <li>
            <a href="/help">Help</a>
          </li>
        </div>
        <div>
          <div className="quote">
            Weaving experiences, ensuring a pleasant journey for every
            adventurer
          </div>
          <p className="underQuote">Fly with us...</p>
        </div>
      </div>
      <div className="copyrightDiv flex">
        <AiOutlineCopyrightCircle className="copyright" />
        <p className="bottomText">Designed by Group 24 | CSE</p>
      </div>
    </div>
  );
}

export default Footer;
