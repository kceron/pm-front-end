import React from "react";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // make a fetch request to login the current user
    // then set that user in state in our App component
    fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((r) => r.json())
      .then((user) => {
        if (user.username){
          this.props.handleLogin(user);
        }else{
          alert("Invalid username or password")
        }
      });
  };

  render() {
    return (
      <>
        <div className="form-container sign-in-container">
          <form className="form-auth" onSubmit={this.handleSubmit}>
            <div className="login-form-header">
              <h2 className="form-title">Login</h2>
            </div>

            <input
              className="input-auth"
              type="text"
              //css
              placeholder="Username"
              // class="input"
              //css ends
              name="username"
              autoComplete="off"
              value={this.state.username}
              onChange={this.handleChange}
            />

            <input
              className="input-auth"
              type="password"
              //css
              placeholder="Password"
              // class="input"
              //css ends
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="current-password"
            />

            <button className="form-button" type="submit">
              {" "}
              Sign in{" "}
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Login;
