import React from "react";
import RecipeCard from "./RecipeCard";

class FavRecipesList extends React.Component {
  
  //ADD MAP TP THIS FUNCTION , IF ERROR PUT this,props.favs into  A VARIABLE
  renderFavs = () => {
    this.props.favs()
  }



  render() {
    console.log("FAVS", this.props)
    return (
      <div>
        {this.renderFavs()}
        {/* <RecipeCard {this.renderFavs()} /> */}
      </div>
    );
  };
  }


export default FavRecipesList;
