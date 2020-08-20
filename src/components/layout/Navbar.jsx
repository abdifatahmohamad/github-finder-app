import React from "react";
import PropTypes from "prop-types";
// Use link from react-router
import { Link } from "react-router-dom";

const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>

      {/* Create links to out App comp (home page) for the about page */}
      {/* We don't wanna use a tags */}
      <ul>
        <li>
          {/* Whenever you're creating links that go within your application 
          instead of using a tags you want to make sure you use the link from from reactor rather Don. */}
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
