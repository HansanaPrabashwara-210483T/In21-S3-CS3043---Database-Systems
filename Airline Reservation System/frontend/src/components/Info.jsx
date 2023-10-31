import React, { Component } from "react";
import { SlCalender } from "react-icons/sl";
import { BsShieldCheck } from "react-icons/bs";
import { BsBookmarkCheck } from "react-icons/bs";
import image from "../assets/bg2.jpg";

export class Info extends Component {
  render() {
    return (
      <div className="info section">
        <div className="infoContainer container">
          <div className="titleDiv flex">
            <h2>Travel to make memories all around the world!</h2>
            <button className="bttn">View All</button>
          </div>
          <div className="cardsDiv grid">
            <div className="singleCard grid">
              <div className="iconDiv flex colorOne">
                <SlCalender className="icon" />
              </div>
              <span className="cardTitle">Book & Relax</span>
              <p>
                You can also call airlines from your phone and book a flight
                ticket!
              </p>
            </div>
            <div className="singleCard grid">
              <div className="iconDiv flex colorOne">
                <BsShieldCheck className="icon" />
              </div>
              <span className="cardTitle">Safe & Secure</span>
              <p>
                You can also call airlines from your phone and book a flight
                ticket!
              </p>
            </div>
            <div className="singleCard grid">
              <div className="iconDiv flex colorOne">
                <BsBookmarkCheck className="icon" />
              </div>
              <span className="cardTitle">Save Money</span>
              <p>
                You can also call airlines from your phone and book a flight
                ticket!
              </p>
            </div>
          </div>
          <div className="cardsDiv2 grid">
            <div>
              <img src={image} className="singleImage grid" />
            </div>
            <div>
              <img src={image} className="singleImage grid" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
