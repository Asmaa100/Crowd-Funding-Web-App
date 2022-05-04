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
            <div className="dropdown">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
                        <strong>mdo</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
