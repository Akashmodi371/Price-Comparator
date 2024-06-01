import React from "react";
import aweq from "./images/aweq.jpg";
import { Link } from "react-router-dom";
import wwq from "./images/wwq.webp";
import './css/Front.css'; // Import the CSS file

const Front = () => {
  return (
    <div className="bg-light w-screen h-screen flex flex-col items-center justify-center">
      <div className="title text-4xl text-dark font-bold mb-14">
        Price Comparator
      </div>

      <div className="card-container flex flex-row items-center justify-center space-x-10">
        <div className="card flex flex-col items-center text-center p-5">
          <Link to="/amazon" className="link">
            <img className="image mb-3" src={aweq} alt="Amazon" />
            <div className="link-text">Amazon</div>
          </Link>
        </div>
        <div className="card flex flex-col items-center text-center p-5">
          <Link to="/Flipkart" className="link">
            <img className="image mb-3" src={wwq} alt="Flipkart" />
            <div className="link-text">Flipkart</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Front;
