// NoFlightsPage.js

import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
//import "./Styles/NoFlightsAvailable.css";
import NavBar from "./Navbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const NoFlightsPage = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20vh",
          }}></Box>
        <div className="no-flights-page">
          <h2>Sorry.... No Flights Available</h2>
          <p>There are no flights available during the given time period.</p>
          <br />
          <Button
            type="submit"
            onClick={handleReturn}
            fullWidth
            variant="contained"
            sx={{ mt: 6, mb: 2, backgroundColor: "black" }}>
            {" "}
            Return
          </Button>
        </div>
      </Container>
    </>
  );
};

export default NoFlightsPage;
