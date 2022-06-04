import React from 'react'


class Form extends React.Component {
  state = {
    creator: "",
    title: "",
    message: "",
  }

// Set the value from inputs to state
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value })
    
  };

  handleAddClick = () => {
    this.props.onSubmitFunction({
      creator: this.state.creator,
      title: this.state.title,
      message: this.state.message
    })
    this.setState({ creator: '', title: '', message: ''})
  }

  emptyFeilds= () => {
    this.setState({ creator: '', title: '', message: ''})
  }

render() {

  return (
    <div className="form-container">
    <h2 className="form-title"> Creating a Memory </h2>
    <input
      type="text"
      className="creator"
      placeholder="Creator"
      name='creator'
      value={this.state.creator}
      onChange={this.handleInput}
    />
    <input
      type="text"
      className="title"
      placeholder="Title"
      name='title'
      value={this.state.title}
      onChange={this.handleInput}
    />
    <textarea
      type="text"
      className="input-message"
      placeholder="Message"
      rows="4"
      cols="50"
      name='message'
      value={this.state.message}
      onChange={this.handleInput}
    />
    <input
      type="button"
      className="submit"
      value="SUBMIT"
      onClick={this.handleAddClick}
    />
    <input type="button" className="clear" value="CLEAR" onClick={this.emptyFeilds}/>
  </div>
  )

}
}

export default Form