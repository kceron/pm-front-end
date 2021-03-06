import React, { Component } from "react";
import SignUp from "./Components/auth/SignUp";
import Login from "./Components/auth/Login";
import Overlay from "./Components/auth/Overlay";

export default class Home extends Component {
  state = {
    rightPanelActive: false,
  };

  handleClickSignUpButton = () =>
    this.setState({
      rightPanelActive: true,
    });

  handleClickSignInButton = () =>
    this.setState({
      rightPanelActive: false,
    });


  render() {
    const { handleClickSignUpButton, handleClickSignInButton } = this;
    const { rightPanelActive } = this.state;

    return (
      <div className="App">
        <div
          className={`container ${
            rightPanelActive ? `right-panel-active` : ``
          }`}
          id="container"
        >
          <Login handleLogin={this.props.handleLogin} />
          <SignUp handleLogin={this.props.handleLogin} />
          {/* <h1>Status: {this.props.loggedInStatus}</h1> */}
          <Overlay
            handleClickSignInButton={handleClickSignInButton}
            handleClickSignUpButton={handleClickSignUpButton}
          />
        </div>
      </div>
    );
  }
}