import React from "react";
import logo from "../assets/logoNameSmall.png";
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
            <a href="Home">Home</a>
          </li>
          <li>
            <a href="Home">Explore</a>
          </li>
          <li>
            <a href="Home">Travel</a>
          </li>
          <li>
            <a href="Home">About us</a>
          </li>
        </div>
        <div>
          <div className="quote">
            Uniting destinations, ensuring seamless journeys for every traveler.
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
