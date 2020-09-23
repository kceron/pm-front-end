import React from "react";
import "./RecipeCard.css";
import { Link } from 'react-router-dom'

class RecipeCard extends React.Component {

  toggleFavorite = () => {
    const { id, favorite } = this.props.recipe 
    // update listing on the server
    fetch(`http://localhost:3000/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ favorite: !favorite })
    })
    .then(r => r.json())
    .then(updatedRecipe => {
      console.log(updatedRecipe)
      // use callback to update recipe in state
      this.props.handleUpdateRecipe(updatedRecipe)
    },() => console.log("TOGGLE", this.props)) 
  }


  render() {
    // console.log("FROM R CARD", this.props.recipe);
    const {
      id,
      title,
      picture,
      favorite
    } = this.props.recipe;

    return (

        <div className="card">
          <h2 className="card-head">{title}</h2>
          <img src={picture} alt="Recipe" className="card-media" />
          <div className="card-details">
            <Link to={`/recipes/:id`} className="card-action-button">
              SHARE
            </Link>
            <Link to={`/recipes/${id}`}  className="card-action-button">
              GO TO RECIPE
            </Link>
            { this.props.currentUser ?
            <button 
            // NEED TO ADD CSS FOR LIKE BUTTON
            className="like-button"
            onClick={this.toggleFavorite} 
            className="favorite">{favorite ? "♥" : "♡"}</button>
             : 
              null
            }        
          </div>
        </div>

    );
  }
}

export default RecipeCard;
