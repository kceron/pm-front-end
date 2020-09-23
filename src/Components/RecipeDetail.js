import React from "react";
import { Link } from 'react-router-dom'
import "./RecipeCard.css";

class RecipeDetail extends React.Component {
  state = {
    recipe: null,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`http://localhost:3000/recipes/${id}`)
      .then((r) => r.json())
      .then((recipe) => {
        this.setState({
          recipe: recipe,
        });
      });
  }

  toggleFavorite = () => {
    const { id, favorite } = this.state.recipe;
    // update listing on the server
    fetch(`http://localhost:3000/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorite: !favorite }),
    })
      .then((r) => r.json())
      .then((updatedRecipe) => {
        this.setState({ recipe: updatedRecipe });
      });
  };

  render() {
    console.log("FROM R DETAIL", this.props.match.params.id);
    const { recipe } = this.state;

    const {
      title,
      cooktime,
      ingredients,
      instructions,
      picture,
      vegetarian,
      favorite,
    } = this.state.recipe;

    return (
      <div className="card">
        <h2 className="card-head">{title}</h2>
        <img src={picture} alt={title} className="card-media" />
        <div className="new-details">
          <strong>{cooktime}</strong>
          <p>{ingredients}</p>
          <p>{instructions}</p>
          {vegetarian ? 
          <strong>Vegetatian</strong>
          :
          null
        }
        </div>
        <div className="card-details">
          <Link to={`/recipes/:id`} className="card-action-button">
            SHARE
          </Link>
          {this.props.currentUser ? (
            <button
              // NEED TO ADD CSS FOR LIKE BUTTON
              className="like-button"
              onClick={this.toggleFavorite}
              className="favorite"
            >
              {favorite ? "♥" : "♡"}
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default RecipeDetail;
