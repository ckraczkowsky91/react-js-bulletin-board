//this exercises is to illuminate how React projects are a collection of composed Components
import React, { Component } from 'react'
import Note from './Note'
// creating a parent Component called Board to render the Note component
// we don't need to use the fuly qualified name of React.Component because we imported the Component class in the import statement
class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [
        {
          id: 0,
          note: "Call Lisa"
        },
        {
          id: 1,
          note: "Email John"
        },
        {
          id: 2,
          note: "Order printer ink"
        }
      ]
    }
    this.eachNote = this.eachNote.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }

  update(newText, i) {
    console.log("updating item at index", i, newText)
    this.setState(prevState => ({
      notes: prevState.notes.map(
        note => (note.id !== i) ? note : {...note, note: newText}
      )
    }))
  }

// adding a function to remove a Note Component
  remove(id) {
    console.log('removing item at', id)
// below we use a callback function
    this.setState(prevState => ({
// we use the callback to reset the state of notes using the filter() function
// filter passes in a note and performs a logical check
// this will return an array that will return the array without the note containing that id
      notes: prevState.notes.filter(note => note.id !== id)
    }))
  }

  eachNote(note, i) {
    return (
      <Note key={i}
            index={i}
            onChange={this.update}
// now we have to add the remove() function that we defined above to the onRemove() function of the Note component
            onRemove={this.remove}>
            {note.note}
      </Note>
    )
  }

  render() {
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
      </div>
    )
  }
}

export default Board
