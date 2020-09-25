import React from "react";
import "./RecipeDetail.css";
// import '../LikeButton.scss'
// import { Link } from "react-router-dom";

class RecipeDetail extends React.Component {
  state = {
    title: "",
    cooktime: 0,
    ingredients: "",
    instructions: "",
    picture: "",
    category: false,
    favorite: false,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`http://localhost:3000/recipes/${id}`)
      .then((r) => r.json())
      .then((recipE) => {
        this.setState({
          ...this.state,
          title: recipE.title,
          cooktime: recipE.cooktime,
          ingredients: recipE.ingredients,
          instructions: recipE.instructions,
          picture: recipE.picture,
          category: recipE.category,
          favorite: recipE.favorite,
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
    // console.log("FROM R DETAIL", this.props.match.params.id);
    // const { recipe } = this.state;

    const {
      title,
      cooktime,
      ingredients,
      instructions,
      picture,
      category,
      favorite,
    } = this.state;

    return (
      <div className="card-detail">
        <img src={picture} alt={title} className="card-pic" />
        <div className="new-details">
          <h1 className="recipe-detail-title">{title}</h1>
          <strong className="cook-time">{cooktime} min</strong>
          <p className="pformat">
            <strong>Ingredients: </strong>
            {ingredients}
          </p>
          <br />
          <p className="pformat">
            <strong>Steps: </strong>
            {instructions}
          </p>
          <br />
          <p className="pformat">
            <strong>Category: </strong>
            <br />
            {category}
          </p>
        </div>
        <div className="card-details">
          {this.props.currentUser ? (
            <button
              // NEED TO ADD CSS FOR LIKE BUTTON
              className="like-button"
              onClick={this.toggleFavorite}
            >
              {favorite ? "🤤" : "😌"}
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default RecipeDetail;
