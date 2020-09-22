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
      title,
      picture,
      favorite
    } = this.props.recipe;

    return (

        <div className="card">
          <img src={picture} className="card-media" />
          <div className="card-details">
            <h2 className="card-head">{title}</h2>
            {/* <Link to={`/recipes/:id`} className="card-action-button">
              SHARE
            </Link> */}
            { this.props.currentUser ?
            <button onClick={this.toggleFavorite} className="favorite">{favorite ? "♥" : "♡"}</button>
             : 
              null
            }
            <Link to={`/recipes/:id`}  className="card-action-button">
              GO TO RECIPE
            </Link>
        
          </div>
        </div>

    );
  }
}

export default RecipeCard;
