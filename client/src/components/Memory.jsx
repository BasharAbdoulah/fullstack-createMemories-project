import React from "react";
import itemImg from "../images/friends-36143111920.jpeg"
import { FaThumbsUp } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { BsXCircle } from "react-icons/bs";



class Memory extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      editingMode: true,
      like: 0,
      creator: "",
      title: "",
      message: ""
    }
    this.updateState = this.updateState.bind(this)
    this.emptyFeilds = this.emptyFeilds.bind(this)
  }

    increaseLike = () => {
      this.props.likeFunction({
        idLike: this.props._id,
        like: this.props.likes
      })
      
    }

    handleEditInput = e => {
      this.setState({ [e.target.name]: e.target.value })
    }
    // put old data in state 
    updateState(e) {
      this.setState({ 
        creator: this.props.newCreator,
        title: this.props.newTitle,
        message: this.props.newMessage,
        like: this.props.likes,
        editingMode: false
        })
    }

      // submit edit values
  editMemoryClick = () => {
    this.props.updateMemory( {
      creator: this.state.creator,
      title: this.state.title,
      message: this.state.message,
    } ) 
    this.setState({ creator: '', title: '', message: '', editingMode: true})
    this.props.submitEditFunction()
  }

  emptyFeilds() {
    this.setState({ creator: '', title: '', message: ''})
  }

      // Memory Card
    MeoryCard = () => {
      const {newTitle, newCreator, newMessage, deleteMemory,  _id, updateEditMode, likes} = this.props
      return (
        <div className="item" id={_id}>
        <div className="img-part">
          <img alt="" src={itemImg} />
          <div className="img-text">
            <h3> { newCreator } </h3>
            <span className="dots" onClick={() => updateEditMode(_id)}><FaPen onClick={this.updateState} /></span>
          </div>
        </div>
        <div className="text-part">
          <p className="tags">#web #webdesign</p>
          <h2 className="title"> { newTitle } </h2>
          <p className="message"> { newMessage } </p>
        </div>
        <div className="like-box">
          <span className="like" onClick={this.increaseLike}>
            <FaThumbsUp /> LIKE <span className="like-count">{ likes }</span>
          </span>
          <span className="delete" onClick={() => deleteMemory(_id)} >
            <FaTrash /> DELETE
          </span>
        </div>
        <span></span>
      </div>
      )
    }

    // Edit Form for memory card
    editForm = () => {
      return (
        <>
        <div className="edit-form"  >
        <span></span>
          <BsXCircle className="close" onClick={() => { this.setState({ editingMode: true }) }} />
        <h2 className="edit-title"> Update Your Memory! </h2>
        <input
          type="text"
          className="creator"
          placeholder="Creator"
          name='creator'
          value={this.state.creator}
          onChange={this.handleEditInput}
        />
        <input
          type="text"
          className="title"
          placeholder="Title"
          name='title'
          value={this.state.title}
          onChange={this.handleEditInput}
        />
        <textarea
          type="text"
          className="edit-message"
          placeholder="Message"
          rows="8"
          cols="50"
          name='message'
          value={this.state.message}
          onChange={this.handleEditInput}
  
        />
        <input
          type="button"
          className="submit"
          value="UPDATE"
          onClick={this.editMemoryClick}
        />
        <input type="button" className="clear" value="CLEAR" onClick={this.emptyFeilds}/>

        </div>
      </>
      )

    }
  render() {
          return !this.state.editingMode ? this.editForm() : this.MeoryCard()  
  }
}


export default Memory;
