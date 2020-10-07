import React from "react";

class EditMessage extends React.Component {
  state = {
    // body: this.props.message.body
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    // Make a PATCH request to /recipes/:id.
    // The body of the request should be an object that looks like this:
    // { body: "edited message" }
    // Once you have successfully saved the edited message on the server,
    // find a way to update the message in your chat application as well.
    // You should also change the Message state to leave 'editing' mode.
  };

  render() {
    return (
      <div className="form-new">
        <h2>Edit Recipe</h2>
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

export default EditMessage;
