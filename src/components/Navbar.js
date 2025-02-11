import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>HRMS</h1>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/create-employee">Create Employee</Link>
        <Link to="/leave-request">Leave Request</Link>
        <Link to="/leave-calendar">Leave Calendar</Link>
      </div>
    </nav>
  );
};

export default Navbar;