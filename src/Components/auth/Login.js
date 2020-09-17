import React from 'react'

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log("From Login", this.state)
    // make a fetch request to login the current user
    // then set that user in state in our App component
    fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(r => r.json())
      .then(user => {
        this.props.handleLogin(user)
      })
  }

  render() {
    return (
      <>
      <div class="container__form container--signin">

      <form action="#" class="form" id="form2" onSubmit={this.handleSubmit}>
        <h2 class="form__title">Log In</h2>

        <label>Username: </label>
        <input type="text" 
        //css
        // placeholder="Username"
        // class="input"
        //css ends
        name="username" 
        autoComplete="off" 
        value={this.state.username} 
        onChange={this.handleChange} />

        <label>Password: </label>
        <input type="password" 
        //css
        // placeholder="Password"
        // class="input"
        //css ends
        name="password" 
        value={this.state.password} 
        onChange={this.handleChange} 
        autoComplete="current-password" />

        {/* <button class="btn">Sign In</button> */}
        <input type="submit" value="Login" />
      </form>
      </div>

      </>
    )
  }
}

export default Login