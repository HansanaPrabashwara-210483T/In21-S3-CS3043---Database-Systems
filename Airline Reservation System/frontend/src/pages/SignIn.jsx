import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NavBar from "./Navbar";
import { PiPasswordFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

import HiveSharpIcon from "@mui/icons-material/HiveSharp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";

export default function SignIn() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        Username: username,
        Password: password,
      });

      // If returned status is 200, then login was successfu
      if (response.status === 200) {
        if (response.data.token) {
          // setUser(response.data.user);
          // Store the JWT (if it exists) in the client's local-storage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user_id", response.data.user.user_id);
          localStorage.setItem("username", response.data.user.username);
          localStorage.setItem("customer_id", response.data.user.customer_id);

          if (response.data.user.username == "Admin") {
            navigate("/dashboard");
          } else {
            navigate(-1);
          }
        } else {
          // Redirect to the previous page on successful login
          navigate(-1);
        }
      } else if (response.status === 401) {
        alert("ERROR: " + response.data.message);
      } else if (response.status === 500) {
        alert("ERROR: " + response.data.message);
      }
    } catch (error) {
      alert("ERROR: " + error);
      navigate("/sign-in");
      console.log(error);
      //useNavigate('/somewhere');
    }
  };

  return (
    <>
      <NavBar />
      <Background />
      <div className="signinContainer">
        <CssBaseline />
        <div className="glassBox">
          <Box
            className="signin"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <h1>Sign in</h1>
            <div className="allBoxes">
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}>
                <div className="box">
                  <div className="iconDiv">
                    <CgProfile className="icon" />
                  </div>

                  <TextField
                    sx={{ width: 400 }}
                    InputLabelProps={{
                      sx: {
                        fontFamily: "Ubuntu",
                      },
                    }}
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>

                <div className="box">
                  <div className="iconDiv">
                    <PiPasswordFill className="icon" />
                  </div>
                  <TextField
                    sx={{ width: 400 }}
                    InputLabelProps={{
                      sx: {
                        fontFamily: "Ubuntu",
                      },
                    }}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <button
                  className="bttn bttnsignin"
                  type="submit"
                  fullWidth
                  variant="contained">
                  Sign In
                </button>
              </Box>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}
