import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import logo from "../assets/RealtorCorner.png";
import AuthContext from "../context/AuthContext";
import menu_icon from "../assets/menu_icon.svg";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const navigationLinksRef = useRef(null);

  const toggleMenu = () => {
    if (navigationLinksRef.current) {
      navigationLinksRef.current.classList.toggle("mobile-menu");
    }
  };

  return (
    <nav className="container navigation">
      <div className="left-nav">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        {user ? <p>Hello {user.username}</p> : <p>Hello there</p>}
      </div>

      <ul className="navigation_links" ref={navigationLinksRef}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/properties">Properties</Link>
        </li>
        <li>
          <Link to="/admin-dashboard">Admin</Link>
        </li>
        <li className="auth_nav_item">
          {user ? (
            <Link onClick={logoutUser}>Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>

      <img
        src={menu_icon}
        alt="hamburger menu"
        className="hamburger"
        onClick={toggleMenu}
      />
    </nav>
  );
};

export default Navbar;
