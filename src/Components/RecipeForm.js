import React from "react";
import "./RecipeForm.css";

const defaultState = {
  title: "",
  cooktime: "",
  ingredients: "",
  instructions: "",
  picture: {},
  category: "",
};

class RecipeForm extends React.Component {
  state = defaultState;

  handleChange = (event) => {
    event.persist();
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    this.setState({
      [event.target.name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let form = new FormData();
    form.append("picture", this.state.picture);
    form.append("title", this.state.title);
    form.append("cooktime", this.state.cooktime);
    form.append("ingredients", this.state.ingredients);
    form.append("instructions", this.state.instructions);
    form.append("category", this.state.category);
    form.append("user_id", this.props.currentUser.id);
    // console.log(form)
    fetch("http://localhost:3000/recipes", {
      method: "POST",
      body: form,
    })
      .then((r) => r.json())
      .then((newRecipe) => {
        this.props.history.push(`/recipes/${newRecipe.id}`);
        this.props.onFormSubmit(newRecipe);
      });
  };

  render() {
    console.log(this.props);
    return (
      <div className="form-new">
        <h2>New Recipe</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />

          <label htmlFor="cooktime">Cooktime: </label>
          <input
            type="text"
            name="cooktime"
            value={this.state.cooktime}
            onChange={this.handleChange}
          />

          <label htmlFor="ingredients">Ingredients: </label>
          <textarea
            rows="10"
            name="ingredients"
            value={this.state.ingredients}
            onChange={this.handleChange}
          />

          <label htmlFor="instructions">Instructions: </label>
          <textarea
            rows="30"
            name="instructions"
            value={this.state.instructions}
            onChange={this.handleChange}
          />

          <label className="fileupload" htmlFor="picture">
            Picture Upload{" "}
            <input type="file" name="picture" onChange={this.handleChange} />
          </label>

          <label htmlFor="category">Diet Category: </label>
          <select
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
          >
            <option value="Vegetarian">Vegetarian</option>
            <option value="omnivore">Omnivore</option>
            <option value="Vegan">Vegan</option>
            <option value="Pescatarian">Pescatarian</option>
          </select>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default RecipeForm;
