import React from "react";


class RecipeDetail extends React.Component {
  render() {
    console.log("FROM R CARD", this.props);
    // const {
    //   title,
    //   cooktime,
    //   ingredients,
    //   instructions,
    //   picture,
    //   vegetarian,
    //   favorite,
    // } = this.props;

    return (

        <div class="card">
          {/* <img
            src={picture}
            class="card-media"
          />
          <div class="card-details">
            <h2 class="card-head">{title}</h2>
            <a href="#/" class="card-action-button">
              SHARE
            </a>
            <a href="#/" class="card-action-button">
              GO TO RECIPE
            </a>
          </div> */}
        </div>

    );
  }
}

export default RecipeDetail;
