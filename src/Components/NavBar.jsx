// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import BadgeIcon from '@mui/icons-material/Badge'; // Import BadgeIcon
import './NavBar.css'; // Import the CSS file for styling

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Add BadgeIcon here with the desired color */}
        <BadgeIcon style={{ color: '#BB86FC', fontSize: '1.5rem', marginRight: '10px' }} />

        <Link className="navbar-brand" to="/">
          OCR-Thai-Identification
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
            {/* <Link className="nav-link" to="/Identity">
              Identity
            </Link> */}
            <Link className="nav-link disabled" tabindex="-1" aria-disabled="true">
              Identity
            </Link>
            <Link className="nav-link" to="/Records">
              Records
            </Link>
            <Link className="nav-link" to="/Success-rate">
              Statistics
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
