import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NavBar from "./Navbar";
import Background from "../components/Background";

import HiveSharpIcon from "@mui/icons-material/HiveSharp";
import logo from "../assets/logoNameSmall.png";

const LoginForBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const flight_id = location.pathname.split("/")[2];

  return (
    <>
      <NavBar />
      <Background />
      <br></br>
      <div className="glassloginbooking">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            {/* <HiveSharpIcon /> */}
            <div className="logoDiv" style={{ width: "50%" }}>
              <img src={logo} alt="B Airways logo" className="logo" />
            </div>
            <div className="models">
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <button
                  className="bttn bttnNew2"
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/sign-up")}>
                  {/* href="/sign-up"> */}
                  Sign Up
                </button>

                <button
                  className="bttn bttnNew2"
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/sign-in")}>
                  {/* href="/sign-in"> */}
                  Sign In
                </button>

                <button
                  className="bttn bttnNew2"
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/guest/" + flight_id)}>
                  Proceed as a Guest
                </button>
              </Box>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default LoginForBooking;
