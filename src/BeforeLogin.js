import React from "react";
import { withRouter } from "react-router-dom";
import Login from "./Components/auth/Login";
import SignUp from "./Components/auth/SignUp";
import Overlay from "./Components/auth/Overlay";

class BeforeLogin extends React.Component {
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
    console.log("PROPS INSIDE BEFORE LG", this.props);
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

export default withRouter(BeforeLogin);
