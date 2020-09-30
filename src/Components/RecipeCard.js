import React from "react";
import "./RecipeCard.css";
import { Link } from "react-router-dom";

class RecipeCard extends React.Component {
  state = {
    favorite: false,
    favoriteId: null
  }

  componentDidMount() {
    if (this.props.currentUser){
      const x = this.props.currentUser.favorites.find(favorite => {
        if (favorite.recipe_id === this.props.recipe.id) {
          return true 
        }
      });
      if (x) {
        this.setState({favorite: true, favoriteId: x.id})
      }
    }
  }

  toggleFavorite = (event) => {
    event.preventDefault()
    const { id } = this.props.recipe;
    
    if (!this.state.favorite) {
          // update recipe on the server
    fetch(`http://localhost:3000/favorites`, {
      method: "POST",
      credentials: "include", // sends cookies from logged in user
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user: this.props.currentUser.id, recipeId: id}),
    })
      .then((r) => r.json())
      .then(
        (newFav) => {
          // console.log("NEW FAV", newFav)
          // use callback to update recipe in state
          this.setState(prevState => ({
            favorite: !prevState.favorite, favoriteId: newFav.id
          }))
          this.props.handleUserFavs(newFav);
        }
      );
    }else {
      // DELETE RECIPE FROM FAVS
      fetch(`http://localhost:3000/favorites/${this.state.favoriteId}`, {
      method: "DELETE",
      credentials: "include", // sends cookies from logged in user
      })
      .then((r) => r.json())
      .then((data) => {
        console.log("DATA", data)
        this.props.handleDeleteFavs(data)
        this.setState(prevState => ({
          favorite: !prevState.favorite, favoriteId: null
        }))
      })
    }
  };

  render() {
    console.log("FROM R CARD", this.props.currentUser);
  
    const { id, title, picture } = this.props.recipe;
    const user = this.props.currentUser

    return (
      <div className="card">
        <img src={picture} alt="Recipe" className="card-media" />
        <h2 className="card-head">{title}</h2>
        <div className="card-details">
          <Link to={`/recipes/:id`} className="card-action-button">
            SHARE
          </Link>
          <Link to={`/recipes/${id}`} className="card-action-button">
            GO TO RECIPE
          </Link>
          { user ? (
            <button
              // NEED TO ADD CSS FOR LIKE BUTTON
              className="like-button"
              onClick={this.toggleFavorite}
            >
              {this.state.favorite ? "🖤" : "🤍"}
            </button>
           ) : null} 
        </div>
      </div>
    );
  }
}

export default RecipeCard;
