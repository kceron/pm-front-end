import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import "./Header.css";
import "../Components/logo/logooo.png";

const Header = ({ currentUser, handleLogout }) => {
  return (
    <header id="header">
      <div className="logo" id="logo">
        <NavLink to={"/home"}>
          <img src={require("../Components/logo/logooo.png")} alt="logo" />
        </NavLink>
      </div>

      {/* {currentUser ? (
          <h1>
            {" "}
            Welcome,{" "}
            {currentUser.username.charAt(0).toUpperCase() +
              currentUser.username.slice(1)}
            !{" "}
          </h1>
        ) : null} */}

      <div className="nav-container">
        {currentUser ? (
          <ul>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/recipes/new">Create recipe</Link>
            </li>
            <li>
              <Link to="/logout" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/login">Signup or Login</Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
