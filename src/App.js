import React from "react";
import "./App.css";
import BeforeLogin from "./BeforeLogin";
import Header from "./Components/Header";
import Recipes from "./Components/Recipes";
import Home from "./Home";
import { Switch, Route, Redirect } from "react-router-dom";
import FavRecipesList from "./Components/FavRecipesList";
import RecipeDetail from "./Components/RecipeDetail";
import RecipeForm from './Components/RecipeForm';

class App extends React.Component {
  state = {
    currentUser: null,
    recipes: [],
  };

  // FETCH RECIPES FUNCTION
  fetchRecipes = () => {
    fetch("http://localhost:3000/recipes")
      .then((r) => r.json())
      .then((recipesArr) => {
        this.setState({
          recipes: recipesArr,
        });
      });
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
  };

  // AUTOLOGIN USER & FETCH RECIPES WHEN COMPONENT MOUNTS
  componentDidMount() {
    this.fetchRecipes();
    this.fetchAutologin();
  }

  // UPDATE RECIPE ARRAY
  handleUpdateRecipe = (updatedRecipe) => {
    this.setState((prevState) => {
      const updatedRecipes = prevState.recipes.map((recipe) => {
        if (recipe.id === updatedRecipe.id) return updatedRecipe;
        return recipe;
      });
      return {
        recipes: updatedRecipes,
      };
    });
  };

  // HANDLE NEW RECIPE
  handleAddRecipe = newRecipe => {
    this.setState(prevState => ({
      recipes: [newRecipe, ...prevState.recipes]
    }))
  }

  // HANDLE FAVORITES
  getFavorites = () => {
    const favList = this.state.recipes.filter((recipe) => recipe.favorite);
    return favList;
  };

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
    const { currentUser, recipes } = this.state;
    // console.log("RECIPES APP", recipes)
    return (
      <>
        <Header currentUser={currentUser} handleLogout={this.handleLogout} />
        <main>
          <Switch>
            <Route path="/home">
              <Redirect to="/recipes" />
            </Route>

            <Route exact path={"/recipes"}>
              <Recipes
                currentUser={currentUser}
                recipes={recipes}
                handleUpdateRecipe={this.handleUpdateRecipe}
              />
            </Route>

            <Route exact path={"/favorites"}>
              <FavRecipesList
                currentUser={currentUser}
                recipes={recipes}
                favs={this.getFavorites}
                handleUpdateRecipe={this.handleUpdateRecipe}
              />
            </Route>

          
            <Route path="/recipes/new" render={routeProps => {
              return <RecipeForm history={routeProps.history} onFormSubmit={this.handleAddRecipe} />
            }} />

            <Route
              path="/recipes/:id"
              render={(routeProps) => {
                return <RecipeDetail match={routeProps.match} />;
              }}
            />

            <Route
              exact
              path={"/login"}
              render={(props) => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  user={currentUser}
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
                  user={currentUser}
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
