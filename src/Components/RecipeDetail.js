import React from "react";
import "./RecipeDetail.css";
// import '../LikeButton.scss'
// import { Link } from "react-router-dom";

class RecipeDetail extends React.Component {
  state = {
    title: "",
    cooktime: "",
    ingredients: "",
    instructions: "",
    picture: "",
    category: ""
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
          category: recipE.category
        });
      });
  }

  // toggleFavorite = () => {
  //   const { id, favorite } = this.state.recipe;
  //   // update recipe on the server
  //   fetch(`http://localhost:3000/recipes/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ favorite: !favorite }),
  //   })
  //     .then((r) => r.json())
  //     .then((updatedRecipe) => {
  //       this.setState({ recipe: updatedRecipe });
  //     });
  // };
  handleDeleteClick = () => {

    const id = this.props.match.params.id;
    // delete recipe on the server
    fetch(`http://localhost:3000/recipes/${id}`, {
      method: "DELETE"
      })
      .then((r) => r.json())
      .then((resp) => {
        this.props.handleRemoveRecipe(resp)
      });
  }

  render() {
    console.log("FROM R DETAIL", this.props);
    const isEditable = true;

    const {
      title,
      cooktime,
      ingredients,
      instructions,
      picture,
      category
    } = this.state;

    return (
      <div className="card-detail">
        <img src={picture} alt={title} className="card-pic" />
        <div className="new-details">
          <h1 className="recipe-detail-title">{title}</h1>
          <strong className="cook-time">{cooktime} min</strong>

          <li>
          {isEditable && (
            <div className="actions">
              <button onClick={this.handleEditClick}>
                <span role="img" aria-label="edit">
                  ✏️
                </span>
              </button>
              <button onClick={this.handleDeleteClick}>
                <span role="img" aria-label="delete">
                  🗑
                </span>
              </button>
            </div>
          )}
          </li>

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
              // onClick={this.toggleFavorite}
            >
              {/* {favorite ? "🖤" : "🤍"} */}
            </button>
          ) : null}
        </div>
        <p className="pformat">
            <strong>By: </strong>
            <br />
            {category}
        </p>
      </div>
    );
  }
}

export default RecipeDetail;
