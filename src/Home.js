import React from "react"
import { Switch, Route, withRouter, Redirect } from 'react-router-dom' 
import Login from "./Components/auth/Login"
import SignUp from "./Components/auth/SignUp"

class Home extends React.Component {
    state = {
        currentUser: null
    }

    handleLogin = currentUser => {
        // set current user, then redirect to home page
        this.setState({ currentUser }, () => {
          this.props.history.push('/home')
        })
    }


    render () {
        return (
            <>
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