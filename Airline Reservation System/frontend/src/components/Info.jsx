import React, { Component } from "react";
import { SlCalender } from "react-icons/sl";
import { BsShieldCheck } from "react-icons/bs";
import { BsBookmarkCheck } from "react-icons/bs";
import image1 from "../assets/indo.jpg";
import image2 from "../assets/taj.jpg";

export class Info extends Component {
  render() {
    return (
      <div className="info section">
        <div className="infoContainer container">
          <div className="titleDiv flex">
            <h2>Travel to make memories all around the world!</h2>
          </div>
          <div className="cardsDiv grid">
            <div className="singleCard grid">
              <div className="iconDiv flex colorOne">
                <SlCalender className="icon" />
              </div>
              <span className="cardTitle">Book & Relax</span>
              <p>
                Effortlessly reserve your journey and unwind before you even
                take off.
              </p>
            </div>
            <div className="singleCard grid">
              <div className="iconDiv flex colorOne">
                <BsShieldCheck className="icon" />
              </div>
              <span className="cardTitle">Safe & Secure</span>
              <p>
                Travel with peace of mind knowing that your safety is our top
                priority.
              </p>
            </div>
            <div className="singleCard grid">
              <div className="iconDiv flex colorOne">
                <BsBookmarkCheck className="icon" />
              </div>
              <span className="cardTitle">Save Money</span>
              <p>
                Maximize your budget with our cost-effective travel solutions.
              </p>
            </div>
          </div>
          <div className="cardsDiv2 grid">
            <div>
              <img src={image1} className="singleImage grid" />
            </div>
            <div>
              <img src={image2} className="singleImage grid" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
