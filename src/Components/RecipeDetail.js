import React from "react";
import "./RecipeDetail.css";
import { ReactComponent as Edit } from "./edit.svg";
import { ReactComponent as Delete } from "./close.svg";

class RecipeDetail extends React.Component {
  state = {
    title: "",
    cooktime: "",
    ingredients: "",
    instructions: "",
    picture: "",
    category: "",
    user_id: 0,
    showEditForm: false,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`http://localhost:3000/recipes/${id}`)
      .then((r) => r.json())
      .then((recipE) => {
        this.setState({
          ...this.state,
          title: recipE.title,
          cooktime: recipE.cooktime,
          ingredients: recipE.ingredients,
          instructions: recipE.instructions,
          picture: recipE.picture,
          category: recipE.category,
          user_id: recipE.user_id,
        });
      });
  }

  // FOR EDIT FORM
  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    this.setState({
      [event.target.name]: value,
    });
  };

  // SHOW EDIT FORM
  showForm = () => {
    return (
      <div className="form-new">
        <h2>Edit Recipe</h2>
        <form onSubmit={this.handleEdit}>
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
  };

  // CALLS DELETE RECIPE FROM APP
  handleDeleteClick = (e) => {
    const id = this.props.match.params.id;
    fetch(`http://localhost:3000/recipes/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((resp) => {
        this.props.handleRemoveRecipe(resp);
        this.props.history.push("/home");
      });
  };

  // EDIT RECIPE
  handleEdit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
   
    let form = new FormData();
    form.append("picture", this.state.picture);
    form.append("title", this.state.title);
    form.append("cooktime", this.state.cooktime);
    form.append("ingredients", this.state.ingredients);
    form.append("instructions", this.state.instructions);
    form.append("category", this.state.category);
    form.append("user_id", this.props.currentUser.id);
    
    fetch(`http://localhost:3000/recipes/${id}`, {
      method: "PATCH",
      body: form,
    })
      .then((r) => r.json())
      .then((updatedRecipe) => {
        this.props.handleEditRecipe(updatedRecipe);
        this.setState((prevState) => ({
          ...prevState, 
          ...updatedRecipe
        }))
      });
    this.toggleEditForm();
  };

  // TOGGLE EDIT IN STATE
  toggleEditForm = (e) => {
    this.setState({
      showEditForm: !this.state.showEditForm,
    });
  };

  render() {
    const {
      title,
      cooktime,
      ingredients,
      instructions,
      picture,
      category,
      user_id,
    } = this.state;

    return (
      <div>
        {this.state.showEditForm ? (
          this.showForm()
        ) : (
          <div className="card-detail">
            <img src={picture} alt={title} className="card-pic" />
            <div className="new-details">
              <h1 className="recipe-detail-title">{title}</h1>
              <div className="cook-edit-delete">
                <strong className="cook-time">{cooktime} min</strong>

                {this.props.currentUser &&
                this.props.currentUser.id === user_id ? (
                  <div className="actions">
                    <Edit onClick={this.toggleEditForm} />
                    <Delete onClick={this.handleDeleteClick} />
                  </div>
                ) : null}
              </div>
              <p className="pformat">
                <strong>Ingredients: </strong>
                {ingredients}
              </p>
              <br />
              <p className="pformat">
                <strong>Steps: </strong>
                {instructions}
              </p>
              <br />
              <p className="pformat">
                <strong>Category: </strong>
                <br />
                {category}
              </p>
            </div>
            <div className="card-details">
              {this.props.currentUser ? (
                <button className="like-button"></button>
              ) : null}
            </div>

            {/* NEED TO ADD WHO CREATED THE RECIPE */}
            {/* <p className="pformat">
            <strong>By: </strong>
            <br />
            {category}
        </p> */}
          </div>
        )}
      </div>
    );
  }
}

export default RecipeDetail;
