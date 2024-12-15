import { jwtDecode } from "jwt-decode";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");

  if (token) {
    const decoded = jwtDecode(token);
    var user_id = decoded.user_id;
  }

  return (
    <div className="Home container">
      <div className="hero_text">
        <h1>
          Experience <br /> Agile Real Estate <br /> At It's Affordable Best
        </h1>
        <p>Luxury You Can Afford</p>
        <button className="btn">
          <Link to="/properties">Find a Property</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
