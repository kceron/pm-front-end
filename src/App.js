import React from "react";
import "./App.css";
import BeforeLogin from "./BeforeLogin";
import Header from "./Components/Header";
import Recipes from "./Components/Recipes"
import Home from "./Home";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends React.Component {
  state = {
    currentUser: null,
    recipes: []
  };

  // FETCH RECIPES FUNCTION
 fetchRecipes = () => {
    fetch("http://localhost:3000/recipes")
      .then(r => r.json())
      .then(recipesArr => {
        this.setState({
          recipes: recipesArr
        })
      })
    };
// , () => console.log(this.state.recipes)

    // FETCH USER FOR AUTOLOGIN
    // check if user is logged in, and set current user in state
    fetchAutologin = () => {
      fetch("http://localhost:3000/autologin", {
        credentials: "include",
      })
        .then((r) => {
          if (r.ok) {
            return r.json();
          } else {
            throw Error("Not logged in!");
          }
        })
        .then((user) => {
          this.handleLogin(user);
        })
        .catch((err) => console.error(err));
    }

  // AUTOLOGIN USER & FETCH RECIPES WHEN COMPONENT MOUNTS
  componentDidMount() {
    this.fetchRecipes()
    this.fetchAutologin()
  }

  handleLogin = (currentUser) => {
    // set current user, then redirect to home page
    this.setState({ currentUser }, () => {
      this.props.history.push("/home");
    });
  };

  handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then(() => {
        this.setState({ currentUser: null }, () => {
          this.props.history.push("/");
        });
      });
  };

  render() {
    return (
      // <div className="App">
      //   <Header />
      //   <h1> This is APP </h1>
      //   <Home />
      //   <Recipes />
      //   <FavRecipesList />
      // </div>

      <>
        <Header
          currentUser={this.state.currentUser}
          handleLogout={this.handleLogout}
        />
        <main>
          <Switch>
            <Route path="/home">
        {this.state.currentUser ? <h1>Welcome, {this.state.currentUser.username}</h1> : <Redirect to='/' />}
      </Route>
            <Route
            exact
            path={"/"}
            render={ () => (
              <Recipes 
              recipes={this.state.recipes} />
            )}/>
    
            <Route
              exact
              path={"/login"}
              render={(props) => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  user={this.state.currentUser}
                />
              )}
            />
            <Route
              exact
              path={"/auth"}
              render={(props) => (
                <BeforeLogin
                  {...props}
                  handleLogin={this.handleLogin}
                  user={this.state.currentUser}
                />
              )}
            />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
