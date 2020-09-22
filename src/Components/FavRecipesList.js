import React from "react";
import RecipeCard from "./RecipeCard";

class FavRecipesList extends React.Component {
  //ADD MAP TO THIS FUNCTION , IF ERROR PUT this,props.favs into  A VARIABLE
  renderFavs = () => {
    return this.props
      .favs()
      .map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          currentUser = {this.props.currentUser}
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
