import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiAccountPinCircleLine } from "react-icons/ri";

function Search() {
  return (
    <div className="search section">
      <div className="sectionContainer grid">
        <h1 className="header">Search Flight</h1>
        <div className="btns flex">
          <div className="singleBtn">
            <span>Economy</span>
          </div>
          <div className="singleBtn">
            <span>Business Class</span>
          </div>
          <div className="singleBtn">
            <span>First Class</span>
          </div>
        </div>
        <div className="searchInputs flex">
          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>Depature</h4>
              <input type="text" placeholder="location"></input>
            </div>
          </div>
          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>Destination</h4>
              <input type="text" placeholder="location"></input>
            </div>
          </div>
          <div className="singleInput flex">
            <div className="iconDiv">
              <RiAccountPinCircleLine className="icon" />
            </div>
            <div className="texts">
              <h4>Date</h4>
              <input type="text" placeholder="DD/MM/YY"></input>
            </div>
          </div>
          <button type="button" className="bttn btnBlock flex">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
