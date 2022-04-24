import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand fs-3 mx-3" href="#">
          Welcome
        </div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link fs-5 mx-3 rounded-3">
              User Profile
            </a>
            <a className="nav-link fs-5 mx-3 rounded-3">
              Projects
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
