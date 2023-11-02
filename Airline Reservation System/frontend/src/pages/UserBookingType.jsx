import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NavBar from "./Navbar";
import Background from "../components/Background";

import HiveSharpIcon from "@mui/icons-material/HiveSharp";
import logo from "../assets/logoNameSmall.png";

const UserBookingType = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const flight_id = location.pathname.split("/")[2];

  return (
    <>
      <NavBar /> <Background />
      <br></br>
      <div className="glassloginbooking">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <div className="logoDiv" style={{ width: "50%" }}>
              <img src={logo} alt="B Airways logo" className="logo" />
            </div>
            <div className="models">
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={() =>
                    navigate(
                      "/seat_select/" +
                        flight_id +
                        "/" +
                        localStorage.getItem("customer_id")
                    )
                  }
                  className="bttn bttnNew2">
                  Booking for Me
                </button>

                <button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={() =>
                    navigate(
                      "/user_passenger/" +
                        flight_id +
                        "/" +
                        localStorage.getItem("user_id")
                    )
                  }
                  className="bttn bttnNew2">
                  Booking for Other
                </button>
              </Box>
            </div>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default UserBookingType;
