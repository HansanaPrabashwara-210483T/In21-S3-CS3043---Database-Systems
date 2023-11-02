import * as React from "react";
import NavBar from "./Navbar";
import { Container, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import HiveSharpIcon from "@mui/icons-material/HiveSharp";
import Toolbar from "@mui/material/Toolbar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import Background from "../components/Background";
import logo from "../assets/logoNameSmall.png";

export default function Ticket() {
  const [booking, setBookings] = useState([]);
  const [isButtonHidden, setIsButtonHidden] = useState(false);

  const location = useLocation();
  const booking_id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchALLModels = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/customer_booking/" + booking_id
        );
        setBookings(res.data[0]);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchALLModels();
  }, []);

  console.log(booking["origin"]);

  const removeTAndZ = (dateString) => {
    if (dateString === undefined) return "";
    const [date, time] = dateString.split(/T|Z/);
    const [t, sec] = time.split(".");
    const [h, m, s] = t.split(":");
    return date + " | " + h + " : " + m;
  };

  const printPage = () => {
    window.print();
  };

  const combineEvent = () => {
    setIsButtonHidden(true);
    setTimeout(() => {
      printPage();
    }, 50);
    setTimeout(() => {
      setIsButtonHidden(false);
    }, 1000);
  };

  return (
    <>
      {!isButtonHidden && <NavBar />}
      <Background />
      <br></br>
      <div className="ContainerTicket">
        <div className="glassBox">
          <Container>
            <h1>Your Ticket </h1>

            <Container
              sx={{
                justifyContent: "center",
                display: "flex",
              }}>
              <Box className="models3">
                <Container sx={{ color: "#fff" }}>
                  <div className="logoDiv" style={{ width: "35%" }}>
                    <img src={logo} alt="B Airways logo" className="logo" />
                  </div>

                  <Container>
                    <Typography
                      varient="h1"
                      className="bigText"
                      fontSize={30}
                      fontFamily={"Ubuntu"}
                      marginBottom={2}>
                      {booking.origin}{" "}
                      <ArrowForwardIcon sx={{ fontSize: "0.7em" }} />{" "}
                      {booking.destination}
                    </Typography>
                    <Typography className="smallText" variant="p">
                      Aircraft: {booking.call_sign}
                      <br />
                      Seat No: {booking.seat_class}-{booking.seat_number}
                      <br />
                      Class :{" "}
                      {(booking.seat_class === "E" && "Economy") ||
                        (booking.seat_class === "B" && "Business") ||
                        (booking.seat_class === "P" && "Platinum")}
                      <br />
                      Departure : {removeTAndZ(booking.departure_time)}
                      <br />
                      Arrival : {removeTAndZ(booking.arrival_time)}
                      <br />
                    </Typography>
                    <Typography className="smallText" variant="p">
                      Name : {booking.name}
                      <br />
                      NIC : {booking.nic}
                      <br />
                      Passport Id : {booking.passport_id}
                    </Typography>
                  </Container>
                </Container>
              </Box>
            </Container>
          </Container>
          <Container
            sx={{
              marginTop: "5vh",
              justifyContent: "center",
              display: "flex",
            }}>
            <Grid>
              {!isButtonHidden && (
                <button
                  id="myButton"
                  variant="contained"
                  onClick={combineEvent}
                  className="bttn bttnNew2">
                  Print Ticket
                </button>
              )}
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
}
