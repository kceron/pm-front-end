import React, { Component } from "react";

class Overlay extends Component {
  render() {
    const { handleClickSignUpButton, handleClickSignInButton } = this.props;
    return (
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome</h1>
            <p className="overlay-description">HELLO</p>
            <button
              className="ghost form-button"
              id="signIn"
              onClick={handleClickSignInButton}
            >
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello!</h1>
            <p className="overlay-description">Welcome to FOOOOOD</p>
            <button
              className="ghost form-button"
              id="signUp"
              onClick={handleClickSignUpButton}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Overlay;
