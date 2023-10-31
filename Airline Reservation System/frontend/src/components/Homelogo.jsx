import React from "react";
import video from "../assets/video.mp4";
import logo from "../assets/logoNameLarge.png";

const HomeLogo = () => {
  return (
    <div className="homelogo flex">
      <img src={logo} className="logoLarge"></img>
    </div>
  );
};

export default HomeLogo;
