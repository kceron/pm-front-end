import React from 'react'
import "./RecipeForm.css";

const defaultState = {
  title: "",
  cooktime: 0,
  ingredients: "",
  instructions: "",
  picture: "",
  vegetarian: false
}

class RecipeForm extends React.Component {
  state = defaultState

  handleChange = event => {
    const value = event.target.type === "number" ? parseInt(event.target.value) : event.target.value
    this.setState({
      [event.target.name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(r => r.json())
      .then(newRecipe => {
        // TODO: redirect! /recipes/newRecipeId
        this.props.history.push(`/recipes/${newRecipe.id}`)

        this.props.onFormSubmit(newRecipe)
      })
  }

  render() {
    console.log(this.props)
    return (
      <div className="form-container">
        <h2>New Recipe</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />

          <label htmlFor="cooktime">Cooktime: </label>
          <input type="number" name="cooktime" value={this.state.cooktime} onChange={this.handleChange} />

          <label htmlFor="ingredients">Ingredients: </label>
          <input type="text" name="ingredients" value={this.state.ingredients} onChange={this.handleChange} />

          <label htmlFor="instructions">Instructions: </label>
          <input type="text" name="instructions" value={this.state.instructions} onChange={this.handleChange} />

          <label htmlFor="picture">Picture: </label>
          <input type="text" name="picture" value={this.state.picture} onChange={this.handleChange} />

          <label htmlFor="vegetarian">Vegetarian: </label>
          <input type="checkbox" id="vegetarian" name="vegetarian" value={this.state.vegetarian} onChange={this.handleChange} />


          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default RecipeForm