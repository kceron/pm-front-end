import React from "react";

class SignUp extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // MAKE FETCH REQUEST TO SIGN UP THE CURRENT USER
    // THEN SET THAT USER IN STATE IN OUR APP COMPONENT
    fetch("http://localhost:3000/users", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((r) => r.json())
      .then((user) => {
        this.props.handleLogin(user);
      });
  };

  render() {
    console.log("From signup", this.state);
    const { username, email, password } = this.state;
    return (
      <>
        <div className="form-container sign-up-container">
          <form className="form-auth" onSubmit={this.handleSubmit}>
            <h3 className="form-title">Sign Up</h3>

            <input
              className="input-auth"
              type="text"
              //CSS
              placeholder="Username"
              // class="input"
              //end of css
              name="username"
              autoComplete="off"
              value={username}
              onChange={this.handleChange}
            />

            <input
              type="email"
              //css
              placeholder="Email"
              // class="input"
              //end of css
              className="input-auth"
              name="email"
              autoComplete="current-email"
              value={email}
              onChange={this.handleChange}
            />

            <input
              type="password"
              //css
              placeholder="Password"
              className="input-auth"
              // class="input"
              //end of css
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={this.handleChange}
            />

            <button className="form-button" type="submit">
              {" "}
              Register{" "}
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default SignUp;
