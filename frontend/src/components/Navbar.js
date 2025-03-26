import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ padding: "1rem", background: "#222", color: "white" }}>
    <Link to="/" style={{ marginRight: "1rem", color: "white" }}>
      Home
    </Link>
    <Link to="/compare" style={{ marginRight: "1rem", color: "white" }}>
      Compare
    </Link>
    <Link to="/timeline" style={{ color: "white" }}>
      Timeline
    </Link>
  </nav>
);

export default Navbar;
