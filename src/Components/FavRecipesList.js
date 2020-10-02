import React from "react";
import RecipeCard from "./RecipeCard";

class FavRecipesList extends React.Component {

  renderFavs = () => {
    return this.props.favorites.map((fav) => (
        <RecipeCard
          key={fav.id}
          recipe={fav.recipe}
          currentUser={this.props.currentUser}
          handleDeleteFavs={this.props.handleDeleteFavs}
        />
      ));
  };

  render() {
    return (
      <div>
        <h1>My Favs:</h1>
      
        <div className="card-container">{ this.props.favorites.length > 0 ? this.renderFavs() : "Add some Recipes to your Favs List" } </div>
 
      </div>
    );
  }
}

export default FavRecipesList;