import React from "react";
import "./App.css";
import BeforeLogin from "./BeforeLogin";
import Header from "./Components/Header";
import Recipes from "./Components/Recipes";
import Home from "./Home";
import { Switch, Route, Redirect } from "react-router-dom";
import FavRecipesList from "./Components/FavRecipesList";
import RecipeDetail from "./Components/RecipeDetail";
import RecipeForm from "./Components/RecipeForm";

class App extends React.Component {
  state = {
    currentUser: null,
    recipes: [],
    favorites: [],
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
    this.getFavorites();
  }

  // DELETE A RECIPE
  handleRemoveRecipe = (resp) => {
    this.setState((prevState) => ({
      recipes: prevState.recipes.filter((recipe) => recipe.id !== resp.id),
    }));
  };

  // UPDATE FAVS ARRAY
  handleUserFavs = (newFav) => {
    this.setState((prevState) => ({
      ...prevState,
        favorites: [...prevState.favorites, newFav],
      currentUser: {
        ...prevState.currentUser,
        favorites: [...prevState.currentUser.favorites, newFav],
      },
    }));
  };

  // DELETE FAVS FROM RECIPE ARRAY
  handleDeleteFavs = (deletedFav) => {
    const updatedFavs = this.state.currentUser.favorites.filter((favorite) => {
      if (favorite.id !== deletedFav.id) {
        return true;
      } else {
        return false;
      }
    });
    this.setState((prevState) => ({
      ...prevState,
      favorites: [...updatedFavs],
      currentUser: {
        ...prevState.currentUser,
        favorites: updatedFavs,
      },
    }));
  };

  // FETCH FAVORITES
  getFavorites = () => {
    fetch("http://localhost:3000/favorites", {
      credentials: "include"
    })
      .then((r) => r.json())
      .then((favsArr) => {
        this.setState(
          {
            favorites: favsArr,
          });
      });
  };

  // HANDLE NEW RECIPE
  handleAddRecipe = (newRecipe) => {
    this.setState((prevState) => ({
      recipes: [newRecipe, ...prevState.recipes],
    }));
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
          this.props.history.push("/home");
        });
      });
  };

  render() {
    const { currentUser, recipes, favorites } = this.state;

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
                handleDeleteFavs={this.handleDeleteFavs}
                currentUser={currentUser}
                recipes={recipes}
                handleUserFavs={this.handleUserFavs}
              />
            </Route>

            <Route exact path={"/favorites"}>
              <FavRecipesList
                handleDeleteFavs={this.handleDeleteFavs}
                currentUser={currentUser}
                favorites={this.state.favorites}
              />
            </Route>

            <Route
              path="/recipes/new"
              render={(routeProps) => {
                return (
                  <RecipeForm
                    currentUser={currentUser}
                    history={routeProps.history}
                    onFormSubmit={this.handleAddRecipe}
                  />
                );
              }}
            />

            <Route
              path="/recipes/:id"
              render={(routeProps) => {
                return (
                  <RecipeDetail
                    handleRemoveRecipe={this.handleRemoveRecipe}
                    history={this.props.history}
                    currentUser={currentUser}
                    match={routeProps.match}
                  />
                );
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
