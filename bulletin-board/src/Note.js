import React, { Component } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import { FaSave } from 'react-icons/fa'

class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
    this.edit = this.edit.bind(this)
    this.remove = this.remove.bind(this)
    this.save = this.save.bind(this)
    this.renderForm = this.renderForm.bind(this)
    this.renderDisplay = this.renderDisplay.bind(this)
    this.randomBetween = this.randomBetween.bind(this)
  }
// using the componentWillMount() lifecycle hook method
  componentWillMount() {
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 150, "px"),
      top: this.randomBetween(0, window.innerHeight - 150, "px"),
      transform: `rotate(${this.randomBetween(-25, 25, "deg")})`
    }
  }

// create a function that will randomly place the rendered Note components
  randomBetween(x, y, s) {
    return x + Math.ceil(Math.random() * (y-x)) + s
  }
// using the componentDidUpdate() lifecycle hook method to add the text in the rendered Note to the textarea input that the user edits when editing the Note component
// we use this lifecycle hook method because we want to do something with the Note component after it has been rendered
  componentDidUpdate() {
    var textArea
    if(this.state.editing) {
      textArea = this._newText
      textArea.focus()
      textArea.select()
    }
  }
// we use the shouldComponentUpdate() lifecycle hook method to determine if there was a change made and only rerender the Note component if a change was made
// before adding this method the Note component would render any time that it is saved
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.children !== nextProps.children || this.state !== nextState
    )
  }

  edit() {
    this.setState({
      editing: true
    })
  }

  remove() {
  // the remove() function is called when the trash can icon is clicked
  // when this button is clicked we want to pass the index of the Note to the Board component to have it removed
  // we are using a hack right now where we have predefined all of the Note components and them sequential ids of 0, 1, 2... so that it matches the index
    this.props.onRemove(this.props.index)
    alert(this.props.index)
  }

  save(e) {
    e.preventDefault()
    this.props.onChange(this._newText.value, this.props.index)
    this.setState({
      editing: false
    })
  }
  renderForm() {
    return (
      <div className="note" style={this.style}>
        <form onSubmit={this.save}>
          <textarea ref={input => this._newText = input}
                    defaultValue={this.props.children}/>
          <button><FaSave /></button>
        </form>
      </div>
    )
  }
  renderDisplay() {
    return (
      <div className="note" style={this.style}>
        <p>{this.props.children}</p>
        <span>
          <button onClick={this.edit} id="edit"><FaPencilAlt /></button>
          <button onClick={this.remove} id="remove"><FaTrashAlt /></button>
        </span>
      </div>
    )
  }
  render() {
// change the multiple line if/else statement to an inline if/else statement
    return this.state.editing ? this.renderForm() : this.renderDisplay()
  /* if(this.state.editing) {
      return this.renderForm()
    } else {
      return this.renderDisplay()
    }
*/
  }
}

export default Note
