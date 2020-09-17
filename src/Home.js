import React from "react"
import { Switch, Route, withRouter, Redirect } from 'react-router-dom' 
import Login from "./Components/auth/Login"
import SignUp from "./Components/auth/SignUp"
import Header from "./Components/Header"

class Home extends React.Component {
    state = {
        currentUser: null
    }

    // autologin user in when component mounts
  componentDidMount() {
    // check if user is logged in, and set current user in state
    fetch("http://localhost:3000/autologin", {
      credentials: "include"
    })
      .then(r => {
        if (r.ok) {
          return r.json()
        } else {
          throw Error("Not logged in!")
        }
      })
      .then(user => {
        this.handleLogin(user)
      })
      .catch((err) => console.error(err))
  }

  // updateUser = newUser => {
  //   this.setState({ currentUser: newUser })
  // }
// end of autologin

    handleLogin = currentUser => {
        // set current user, then redirect to home page
        this.setState({ currentUser }, () => {
          this.props.history.push('/home')
        })
    }

    handleLogout = () => {
      fetch("http://localhost:3000/logout", {
        credentials: "include"
      })
        .then(r => r.json())
        .then(() => {
          this.setState({ currentUser: null }, () => {
            this.props.history.push('/')
          })
        })
    }

    render () {
        return (
            <>
            <Header currentUser={this.state.currentUser} handleLogout={this.handleLogout} />
            <main>
          <Switch>
            <Route path="/signup">
              <SignUp handleLogin={this.handleLogin} />
            </Route>
            <Route path="/login">
              <Login handleLogin={this.handleLogin} />
            </Route>
            <Route path="/home">
              {this.state.currentUser ? <h1>Welcome, {this.state.currentUser.username}</h1> : <Redirect to='/' />}
            </Route>
            <Route path="/">
              <h1>Please Login or Sign Up</h1>
            </Route>
          </Switch>
        </main>
            </>
        )
      }
}

export default withRouter(Home);