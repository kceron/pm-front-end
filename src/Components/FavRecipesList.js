import React from "react";
import RecipeCard from "./RecipeCard";

class FavRecipesList extends React.Component {

  renderFavs = () => {
    console.log(this.props.currentUser)
    return this.props
      .favs()
      .map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          currentUser={this.props.currentUser}
          handleUserFavs={this.props.handleUpdateRecipe}
        />
      ));
  };

  render() {
    // console.log("FAVS", this.props);
    return (
      <div>
        <h1>My Favs:</h1>
        <div className="card-container">{this.renderFavs()}</div>
      </div>
    );
  }
}

export default FavRecipesList;
