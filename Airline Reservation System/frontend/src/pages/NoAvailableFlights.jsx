// NoFlightsPage.js
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Background from "../components/Background";

const NoFlightsPage = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <>
      <NavBar />
      <Background />
      <br></br>
      <div className="glassBoxNo">
        <div className="no-flights-page">
          <h2>Sorry.... No Flights Available</h2>
          <p>There are no flights available during the given time period.</p>
          <br />
          <button
            className="bttn bttnreturn"
            type="submit"
            onClick={handleReturn}
            fullWidth
            variant="contained">
            Return
          </button>
        </div>
      </div>
    </>
  );
};

export default NoFlightsPage;
