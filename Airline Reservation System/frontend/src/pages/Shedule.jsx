// Show all flight shedules in next 24 h

import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";
import { Container, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Stack } from "@mui/material";

import Grid from "@mui/material/Grid";

const Schedule = () => {
  const [models, setmodels] = useState([]);

  useEffect(() => {
    const fetchALLModels = async () => {
      try {
        await axios.post("http://localhost:8000/boarding");
      } catch (err) {
        console.log(err);
      }
      try {
        await axios.post("http://localhost:8000/in_air");
      } catch (err) {
        console.log(err);
      }
      try {
        await axios.put("http://localhost:8000/in_air");
      } catch (err) {
        console.log(err);
      }
      try {
        const res = await axios.get("http://localhost:8000/shedule");
        setmodels(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchALLModels();
  }, []);

  const removeTAndZ = (dateString) => {
    const [date, time] = dateString.split(/T|Z/);
    const [t, sec] = time.split(".");
    const [h, m, s] = t.split(":");
    return date + " | " + h + " : " + m;
  };

  const rows: GridRowsProp = models.map((model) => ({
    id: model.call_sign,
    origin: model.origin,
    destination: model.destination,
    depature: removeTAndZ(model.departure_time),
    arrival: removeTAndZ(model.arrival_time),
    status: model.status,
    delay: model.delay.data,
  }));

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Aircraft",
      width: 50,
      flex: 0.75,
    },
    {
      field: "origin",
      headerName: "Origin",
      width: 100,
      flex: 0.75,
    },
    {
      field: "destination",
      headerName: "Destination",
      width: 100,
      flex: 0.75,
    },
    {
      field: "depature",
      headerName: "Depature Time",
      width: 250,
      flex: 1.5,
    },
    {
      field: "arrival",
      headerName: "Arrival Time",
      width: 250,
      flex: 1.5,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      flex: 1,
    },
    {
      field: "delay",
      headerName: "Delay",
      width: 100,
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == 1) {
          return "DELAYED";
        } else {
          return "NOT DELAYED";
        }
      },
    },
  ];

  return (
    <>
      <NavBar />
      <Container className="flightTable">
        <Container>
          <h1>Flight Schedule</h1>
        </Container>

        <div className="models">
          <Box
            sx={{
              width: "100%",
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 8,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      </Container>{" "}
    </>
  );
};
export default Schedule;
