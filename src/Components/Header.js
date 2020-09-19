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

      <div>
        {currentUser ? (
          <ul>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        ) : (
          <>
            <div>
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/login">Signup</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
