import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "../Components/logo/logooo.png";

const Header = ({ currentUser, handleLogout }) => {
  return (
    <header id="header">
      <div className="logo" id="logo">
        <img src={require("../Components/logo/logooo.png")} alt="logo" />
      </div>

      <div className="nav-container">
        {currentUser ? (
          <ul>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
              <li>
              <button onClick={handleLogout}>Logout</button>
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
