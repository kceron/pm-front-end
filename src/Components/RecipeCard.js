import React from "react";
import "./RecipeCard.css";

class RecipeCard extends React.Component {
  render() {
    // console.log("FROM R CARD", this.props);
    const {
      title,
      picture
    } = this.props;

    return (

        <div className="card">
          <img
            src={picture}
            className="card-media"
          />
          <div className="card-details">
            <h2 className="card-head">{title}</h2>
            <a href="#/" className="card-action-button">
              SHARE
            </a>
            <a href="#/" className="card-action-button">
              GO TO RECIPE
            </a>
          </div>
        </div>

    );
  }
}

export default RecipeCard;
