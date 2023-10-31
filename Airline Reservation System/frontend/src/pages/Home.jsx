import React from "react";
import "../App.css";
import Navbar from "./Navbar";
import Background from "../components/Background";
import HomeLogo from "../components/Homelogo";
import Search from "../components/Search";
import Support from "../components/Support";
import Info from "../components/Info";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="App">
      <Navbar />
      <Background />
      <HomeLogo />
      <Support />
      <Info />
      <Footer />
    </div>
  );
}

export default Home;
