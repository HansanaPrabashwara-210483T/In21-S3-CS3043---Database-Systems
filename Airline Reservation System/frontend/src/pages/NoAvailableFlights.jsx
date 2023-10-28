// NoFlightsPage.js

import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Styles/NoFlightsAvailable.css";

const NoFlightsPage = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div className="no-flights-page">
      <h5>No Flights Available <br /> </h5>
      <p>There are no flights available during the given time period. <br /> </p>
      <Button variant="contained" onClick={handleReturn}>
        Return
      </Button>
    </div>
  );
};

export default NoFlightsPage;
