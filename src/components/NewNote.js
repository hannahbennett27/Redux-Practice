import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNote } from '../actions';
import NewNoteNavBar from './NewNoteNavBar';

const mapDispatchToProps = dispatch => {
  return {
    createNote: title => createNote(title, dispatch)
  };
};

class NewNote extends Component {
  state = { newNoteTitle: '' };

  render() {
    return (
      <div>
        <NewNoteNavBar />
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
    const { createNote } = this.props;
    if (e.which === 13) {
      createNote(newNoteTitle);
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(NewNote);
