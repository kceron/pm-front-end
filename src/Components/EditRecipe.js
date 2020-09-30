import React from 'react'

class EditMessage extends React.Component {
  state = {
    // body: this.props.message.body
  }

  handleFormSubmit = e => {
    e.preventDefault()
    // Make a PATCH request to /messages/:id.
    // The body of the request should be an object that looks like this:
    // { body: "edited message" }
    // Once you have successfully saved the edited message on the server, 
    // find a way to update the message in your chat application as well.
    // You should also change the Message state to leave 'editing' mode.
  }

  render() {
    return (
      <form className="edit-message" onSubmit={this.handleFormSubmit}>
        {/* <input type="text" name="body" autoComplete="off" />
        <input type="submit" value="Save" /> */}
      </form>
    )
  }
}

export default EditMessage