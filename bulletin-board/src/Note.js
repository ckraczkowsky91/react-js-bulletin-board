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
      <div className="note">
        <form onSubmit={this.save}>
          <textarea ref={input => this._newText = input}/>
          <button><FaSave /></button>
        </form>
      </div>
    )
  }
  renderDisplay() {
    return (
      <div className="note">
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
