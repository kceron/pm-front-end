import React from "react";
import "./RecipeCard.css";

class RecipeCard extends React.Component {
  render() {
    console.log("FROM R CARD", this.props);
    const { title, cooktime, ingredients, instructions, picture, vegetarian, favorite, } = this.props;

    return (
      <div>
        <li>
          <span>{title}</span>
        </li>

        <div class="card-container">
          <div class="card u-clearfix">
            <div class="card-body">
              <span class="card-number card-circle subtle">{cooktime}</span>
              <span class="card-author subtle">John Smith</span>
              <h2 class="card-title">{title}</h2>
              <span class="card-description subtle">
            {instructions}
              </span>
              <div class="card-read">Read</div>
              <span class="card-tag card-circle subtle">C</span>
            </div>
            <img
              src={picture}
              alt=""
              class="card-media"
            />
          </div>
          <div class="card-shadow"></div>
        </div>
      </div>
    );
  }
}

export default RecipeCard;
