import React from "react";
import RecipeCard from "./RecipeCard";

class Recipes extends React.Component {

  // RENDER INDIVIDUAL RECIPES
  recipeItems() {
    // console.log("FROM RECIPES", this.props)
    return this.props.recipes.map((recipe) => (
      <RecipeCard
        key={recipe.id}
        recipe={recipe}
        handleUserFavs={this.props.handleUserFavs}
        currentUser={this.props.currentUser}
      />
    ));
  }

  render() {
    return (
      <div>
        {this.props.currentUser ? (
          <h1>
            {" "}
            Welcome,{" "}
            {this.props.currentUser.username.charAt(0).toUpperCase() +
              this.props.currentUser.username.slice(1)}
            !{" "}
          </h1>
        ) : null}
        <div className="card-container">{this.recipeItems()}</div>
      </div>
    );
  }
}

export default Recipes;
