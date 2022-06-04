import React, { Component } from 'react'
import Memory from '../Memory';
export class Memorieslist extends Component {
  render() {
    const {memories, deleteMemory, updateEditMode, likeFunction, editingMode, updateMemory, submitEditFunction} = this.props
    return (
      <div className='items-container' >
          {memories.map((memory) => ( <Memory 

                  newTitle={memory.title}
                  newCreator={memory.creator}
                  newMessage={memory.message}
                  newLike={memory.likes}
                  key={memory._id}
                  _id={memory._id}
                  deleteMemory={deleteMemory}
                  updateEditMode={updateEditMode}
                  likeFunction={likeFunction}
                  likes={memory.likes}
                  editingMode={editingMode}
                  updateMemory={updateMemory}
                  submitEditFunction={submitEditFunction}
                />
              
            ))}
      </div>
    )
  }
}

export default Memorieslist
