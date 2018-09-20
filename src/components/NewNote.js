import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePage, createNote } from '../actions';
import NoteNavBar from './NoteNavBar';

const mapDispatchToProps = dispatch => {
  return {
    changePage: page => dispatch(changePage(page)),
    createNote: title => dispatch(createNote(title))
  };
};

class NewNote extends Component {
  state = { newNoteTitle: '' };

  render() {
    return (
      <div>
        <NoteNavBar />
        <div className="card mx-auto">
          <p className="card-body">
            <input
              type="text"
              className="form-control"
              placeholder="Note Title"
              onChange={this.handleChange}
              onKeyPress={this.handleEnter}
            />

            <textarea
              className="form-control new-note-body"
              id="disabledInput"
              rows="2"
              placeholder="Add bullet point..."
              disabled
            />
          </p>
        </div>
      </div>
    );
  }

  handleChange = e => {
    this.setState({ newNoteTitle: e.target.value });
  };

  handleEnter = e => {
    const { newNoteTitle } = this.state;
    const { changePage, createNote } = this.props;

    if (e.which === 13) {
      createNote(newNoteTitle);
      changePage(`${newNoteTitle}.txt`);
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(NewNote);
