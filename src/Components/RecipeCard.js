import React from "react";
import "./RecipeCard.css";
import { Link } from "react-router-dom";

class RecipeCard extends React.Component {
  state = {
    favorite: false
  }

  toggleFavorite = (event) => {
    event.preventDefault()
    const { user_id, id } = this.props.recipe;
    this.setState(prevState => ({
      favorite: !prevState.favorite
    }))
    
    if (this.state.favorite) {
      console.log("YASSSS PLEASEEEEEE")
          // update recipe on the server
    fetch(`http://localhost:3000/favorites`, {
      method: "POST",
      credentials: "include", // sends cookies from logged in user
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user: user_id, recipeId: id}),
    })
      .then((r) => r.json())
      .then(
        (newFav) => {
          // console.log("NEW FAV", newFav)
          // use callback to update recipe in state
          this.props.handleUserFavs(newFav);
        }
      );
    }else {
      // DELETE RECIPE FROM FAVS
      // console.log()
    }

  };

  render() {
    console.log("FROM R CARD", this.state.favorite);
  
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
