import "./css/App.css";
import memImg from "./images/memories.png";
import React from "react";
import Form from "./components/Form";
import { MEMORIES_URI } from "./constans/url";
import Memorieslist from "./components/Memorieslist/Memorieslist";
import Footer from "./components/Footer";


//

class Home extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    // eslint-disable-next-line no-this-before-super
    super();
    this.state = {
      memories: [],
      editMemoryId: "" ,
    };
    this.fetchData = this.fetchData.bind(this);
    this.deleteMemory = this.deleteMemory.bind(this);
    this.updateMemory = this.updateMemory.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(MEMORIES_URI)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          memories: res,
        });
        
      })
      .catch((err) => console.log(err));
  }

  // delete memory
  deleteMemory = (_id) => {

    fetch(`${MEMORIES_URI}/${_id}`, {
      method: "delete",
    }).then((res) => {
      if (res.status === 201) {
        return res.json()
    }
    }).then( (res) => this.fetchData())
    .catch((err) => console.log(err.message))
  }



  // on submit function
  onSubmitFunction = ({ title, creator, message }) => {

    if (title === "" & creator === "" & message === "") {
      return false
    }else {
      fetch(MEMORIES_URI, {
        method: "post",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          title,
          creator,
          message
        })
      }).then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          return res.json()
        }
        throw new Error("cant post!!!")
      })
      .then( (res) => this.fetchData())
      .catch((err) => console.log(err.message))
    }
  }

  // to switch between post form and edit form
  updateEditMode = (_id) => {
    this.setState( { editMemoryId: _id } );
  }
  submitEditFunction = () => {
    this.setState( { editingMode: true } );
  }

  // update memory values
  updateMemory = ({title, creator, message}) => {
    if (title === "" || creator === "" || message === "") {
        return false
    } else {

      fetch(`${MEMORIES_URI}/${this.state.editMemoryId}`, {
        method: "put",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          creator,
          title,
          message
        })
      }).then((res) => {
        if (res.status === 201) {
          return res.json()
        }
        throw new Error("Can't update the memory!!!")
      }).then((res) => this.fetchData())
      .catch((err) => console.log(err.message))
    }    
  }

  // likes function
  likeFunction = ( { idLike, like} ) => {

    fetch(`${MEMORIES_URI}/${idLike}`, {
      method: "put",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        likes: like+1
      })
    }).then((res) => {
      if (res.status === 201) {
        return res.json()
      }
      throw new Error("Can't update the memory!!!")
    }).then((res) => this.fetchData())
    .catch((err) => console.log(err.message))
  
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Memories</h1>
          <img alt="Memories" src={memImg}></img>
        </header>
        {/* container form and content */}
        <section className="main-section">
          {/* Form */}
          <Form
          onSubmitFunction={this.onSubmitFunction}
          submitEditFunction={this.submitEditFunction}
          />
          {/* Memoreis List */}
          <Memorieslist 
          memories={this.state.memories}
          deleteMemory={this.deleteMemory}
          updateEditMode={this.updateEditMode}
          likeFunction={this.likeFunction}
          editingMode={this.state.editingMode}
          updateMemory={this.updateMemory}
          submitEditFunction={this.submitEditFunction}
          />
        </section>
          <Footer />
      </div>
    );
  }
}

export default Home;
