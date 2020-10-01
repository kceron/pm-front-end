import React from "react";
import "./RecipeCard.css";
import { Link } from "react-router-dom";
import {ReactComponent as Heart} from './like.svg'
import {ReactComponent as HeartFill} from './like-fill.svg'

class RecipeCard extends React.Component {
  state = {
    favorite: false,
    favoriteId: null
  }

  // SET FAVS STATE
  componentDidMount() {
    if (this.props.currentUser){
      const fav = this.props.currentUser.favorites.find(favorite => {
        if (favorite.recipe_id === this.props.recipe.id) {
          return true 
        }
      });
      if (fav) {
        this.setState({favorite: true, favoriteId: fav.id})
      }
    }
  }

  toggleFavorite = (event) => {
    event.preventDefault()
    const { id } = this.props.recipe;
    
    if (!this.state.favorite) {
    // UPDATE FAVS ON SERVER
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
    const { id, title, picture } = this.props.recipe;
    const user = this.props.currentUser

    return (
      <div className="card">
        <img src={picture} alt="Recipe" className="card-media" />
        <div className="card-header-details">
        <h2 className="card-head">{title}</h2>
        <div className="card-details">
          <Link to={`/recipes/:id`} className="card-action-button">
            SHARE
          </Link>
          <Link to={`/recipes/${id}`} className="card-action-button">
            GO TO RECIPE
          </Link>
          { user ? (
            <div
              // NEED TO ADD CSS FOR LIKE BUTTON
              className="like-button"
              onClick={this.toggleFavorite}
            >
              {this.state.favorite ? <HeartFill/> : <Heart/>}
            </div>
           ) : null} 
        </div>
        </div>
      </div>
    );
  }
}

export default RecipeCard;
