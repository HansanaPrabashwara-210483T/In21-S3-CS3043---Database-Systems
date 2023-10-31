import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NavBar from "./Navbar";
import HiveSharpIcon from "@mui/icons-material/HiveSharp";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MuiTelInput } from "mui-tel-input";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useEffect, useState } from "react";
import axios from "axios";
import Background from "../components/Background";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";

export default function CustomizedSelects() {
  function Label({ componentName, valueType, isProOnly }) {
    const content = (
      <span>
        <strong>{componentName}</strong>
        for {valueType}
        editing
      </span>
    );
  }

  // variables
  const [originAirports, setOriginAirports] = useState([""]);
  const [targetAirports, setTargetAirports] = useState([""]);

  const [originAirport, setOriginAirport] = React.useState("");
  const [targetAirport, setTargetAirport] = React.useState("");

  //empty time variables
  const [departure_time, setDepatureTime] = React.useState("");
  const [arrival_time, setArrivalTime] = React.useState("");
  // get data

  useEffect(() => {
    // Make an API request to your backend to get the list of airports
    fetch("http://localhost:8000/location/airports")
      .then((response) => response.json())
      .then((data) => {
        setOriginAirports(data);
        setTargetAirports(data);
      })
      .catch((error) => {
        console.error("Error fetching airports:", error);
      });
  }, []); // The empty dependency array ensures the effect runs only once on component mount

  const handleOriginAirportChange = (event) => {
    // handle origin change
    setOriginAirport(event.target.value);
  };
  const handleTargetAirportChange = (event) => {
    // handle origin change
    setTargetAirport(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        "http://localhost:8000/route/available_flights/" +
          originAirport +
          "/" +
          targetAirport +
          "/" +
          departure_time.format() +
          "/" +
          arrival_time.format()
      );

      if (response.data && response.data.length > 0) {
        // The response is not empty, navigate to the given page
        window.location.href =
          "http://localhost:3000/route/available_flights/" +
          originAirport +
          "/" +
          targetAirport +
          "/" +
          departure_time.format() +
          "/" +
          arrival_time.format();
      } else {
        // The response is empty, redirect to another page
        window.location.href =
          "http://localhost:3000/route/noflightsavailablepage";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <NavBar />
      <Background />
      <div className="ContainerBooking">
        <div className="glassBox">
          <h1>Booking</h1>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <div className="singleInput flex">
              <div className="iconDiv">
                <HiOutlineLocationMarker className="icon" />
              </div>
              <Box
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  width: 600,
                }}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{ fontFamily: "Ubuntu" }}
                    id="demo-simple-select-label">
                    Origin Airport
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-1"
                    value={originAirport}
                    label="originAirport"
                    autoFocus
                    onChange={handleOriginAirportChange}>
                    {originAirports.map((originAirport) => (
                      <MenuItem
                        key={originAirport.airport_code}
                        value={originAirport.airport_code}>
                        {originAirport.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>

            <div className="singleInput flex">
              <div className="iconDiv">
                <HiOutlineLocationMarker className="icon" />
              </div>
              <Box
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  width: 600,
                  borderBlockColor: "transparent",
                }}>
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ fontFamily: "Ubuntu" }}>
                    Target Airport
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-2"
                    value={targetAirport}
                    label="targetAirport"
                    onChange={handleTargetAirportChange}>
                    {targetAirports.map((targetAirport) => (
                      <MenuItem
                        key={targetAirport.airport_code}
                        value={targetAirport.airport_code}>
                        {targetAirport.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>

            <div className="singleInput flex">
              <div className="iconDiv">
                <MdOutlineDateRange className="icon" />
              </div>
              <Box
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  width: 600,
                }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem>
                    <DatePicker
                      sx={{ fontFamily: "Ubuntu" }}
                      label="Departure Date"
                      value={departure_time}
                      onChange={(date) => setDepatureTime(date)}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </Box>
            </div>

            <div className="singleInput flex">
              <div className="iconDiv">
                <MdOutlineDateRange className="icon" />
              </div>
              <Box
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  width: 600,
                }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem>
                    <DatePicker
                      className="customDatePicker"
                      label="Arrival Date"
                      value={arrival_time}
                      onChange={(date) => setArrivalTime(date)}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </Box>
            </div>

            <button
              type="submit"
              fullWidth
              variant="contained"
              className="bttn bttnBooking">
              Search Flights
            </button>
          </Box>
        </div>
      </div>
    </>
  );
}
