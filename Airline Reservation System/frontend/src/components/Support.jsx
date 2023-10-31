import React from "react";

const Support = () => {
  return (
    <div className="support section">
      <div className="sectionContainer">
        <div className="titlesDiv">
          <h2 className="caption">Your journey, our passion. Fly with us!</h2>
          <p>
            Explore assistance for bookings and travel insights for a
            hassle-free journey!
          </p>
        </div>
        <div className="infoDiv grid">
          <div className="textDiv grid">
            <div className="singleInfo">
              <div className="numberContainer">
                <span className="number">1</span>
              </div>
              <h4>Search and Reserve</h4>
              <p>
                Find the best flights that suit your schedule and reserve your
                preferred option with ease.
              </p>
            </div>
            <div className="singleInfo">
              <div className="numberContainer">
                <span className="number">2</span>
              </div>
              <h4>Customize</h4>
              <p>
                Tailor your travel experience by adding extras and finalizing
                your booking details to make your journey truly yours.
              </p>
            </div>
            <div className="singleInfo">
              <div className="numberContainer">
                <span className="number">3</span>
              </div>
              <h4>Pay and Confirm</h4>
              <p>
                Complete your transaction securely and receive instant
                confirmation, with our smooth and seamless booking process from
                start to finish.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
