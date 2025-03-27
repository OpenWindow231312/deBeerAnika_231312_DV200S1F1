import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // optional for hover effects, etc.

const Navbar = () => {
  return (
    <nav className="custom-navbar d-flex align-items-center justify-content-between px-5 shadow-sm">
      {/* Logo (you can replace with your own img if needed) */}
      <div className="navbar-logo">
        <img
          src="https://placehold.co/113x67"
          alt="FactFork Logo"
          style={{ height: "67px" }}
        />
      </div>

      {/* Navigation links */}
      <div className="navbar-links d-flex gap-5">
        <NavLink to="/" className="nav-link-custom">
          Home
        </NavLink>
        <NavLink to="/compare" className="nav-link-custom">
          Compare
        </NavLink>
        <NavLink to="/timeline" className="nav-link-custom">
          Trends
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
