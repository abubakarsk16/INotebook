import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const NavBar = (props) => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          
          {localStorage.getItem('token') === null?<div className="d-flex" role="search">
            <Link className="btn btn-link text-light text-decoration-none me-2" to="/login">Login</Link>
            <Link className="btn btn-outline-success text-light" to="/signup">Sign Up</Link>
          </div>:<Link to='/profile'><div className="profile"><i className="fa-thin fa-circle-user"></i></div></Link>}
        </div>
      </div>
    </nav>
  );
}

NavBar.prototype = {
  title: PropTypes.string.isRequired
}
NavBar.defaultProps = {
  title: "LOGO"
}

export default NavBar;
