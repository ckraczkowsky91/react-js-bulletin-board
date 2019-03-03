//this exercises is to illuminate how React projects are a collection of composed Components
import React, { Component } from 'react'
import Note from './Note'
import { FaPlus } from 'react-icons/fa'

// creating a parent Component called Board to render the Note component
// we don't need to use the fuly qualified name of React.Component because we imported the Component class in the import statement
class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
// we are going to load Note components into this variable using the fetch() method
      notes: []
    }
    this.eachNote = this.eachNote.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
    this.add = this.add.bind(this)
    this.nextId = this.nextId.bind(this)
  }
// using the componentWillMount() hook method will be envoked right before the Board is rendered
  componentWillMount() {
    var self = this
    if(this.props.count) {
// we must use back ticks "``" when using {} in a URL which are called "template literals"
// we are using template literals to pass the count property of the Board compontent to the baconipsum API that we fetched 
      fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
        .then(response => response.json())
        .then(json => json[0]
                      .split(". ")
                      .forEach(sentence => self.add(sentence.substring(0, 25))))
    }
  }

  add(text) {
    this.setState(prevState => ({
      notes: [
        ...prevState.notes,
        {
          id: this.nextId,
          note: text
        }
      ]
    }))
  }

// creating a function to add unique ids to the Note components so that we can get rid of our hack
  nextId() {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
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

  // adding a button to the Board component that will trigger our new add() function when clicked
  // we populate each new button with some filler text "New Note"
  render() {
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button onClick={this.add.bind(null, "New Note")} id="add">
          <FaPlus />
        </button>
      </div>
    )
  }
}

export default Board
