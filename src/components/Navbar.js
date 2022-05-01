import React from "react";
import { Link } from "react-router-dom"
import style from "./style.css"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light shadow ">
      <div className="container-fluid">
        <div className="navbar-brand fs-4 mx-3" href="#">
          Welcome
        </div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/profile"className="nav-link fs-5 mx-3 rounded-3">
              User Profile
            </Link>
            <Link to="/projects" className="nav-link fs-5 mx-3 rounded-3">
              Projects
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
