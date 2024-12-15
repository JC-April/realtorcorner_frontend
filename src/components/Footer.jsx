import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="Footer container">
      <p>© 2024 RealtorCorner. All rights reserved.</p>
      <ul>
        <li>
          <Link to="#">Terms of Service</Link>
        </li>
        <li>
          <Link to="#">Privacy Policy</Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
