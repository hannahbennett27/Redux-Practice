import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Error, Loading } from '../components';
import { NoteNavBar } from './';
import { updateSubnotes } from '../actions';
import { getNoteTitle, getActiveNote } from '../utils';

const mapStateToProps = state => {
  return {
    activePage: state.activePage,
    notes: state.notes,
    notesLoading: state.notesLoading,
    notesError: state.notesError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSubnotes: (updatedNote, noteTitle) =>
      updateSubnotes(updatedNote, noteTitle, dispatch)
  };
};

class Note extends Component {
  state = { newSubnote: '' };

  render() {
    const { activePage, notes, notesLoading, notesError } = this.props;
    const { newSubnote } = this.state;
    const activeNote = getActiveNote(notes, activePage);
    const noteTitle = getNoteTitle(activePage);
    const noteDisplay = (
      <div className="card mx-auto">
        <div className="card-body">
          <strong>{noteTitle}</strong>
          {activeNote.subnotes.map((subnote, index) => {
            return (
              <small className="text-muted" key={index}>
                <br />- {subnote}
              </small>
            );
          })}
          <textarea
            className="form-control form-control-sm"
            rows="2"
            placeholder="- Add bullet point..."
            value={newSubnote}
            onChange={this.handleChange}
            onKeyPress={e => this.handleEnter(e, activeNote)}
          />
        </div>
      </div>
    );

    return (
      <div>
        <NoteNavBar />
        {notesError && <Error />}
        {notesLoading && <Loading />}
        {!notesError && !notesLoading && noteDisplay}
      </div>
    );
  }

  handleChange = e => {
    this.setState({ newSubnote: e.target.value });
  };

  handleEnter = (e, activeNote) => {
    if (e.which === 13) {
      const { updateSubnotes, activePage: noteTitle } = this.props;
      const updatedNote = this.formatUpdatedNote(activeNote);
      updateSubnotes(updatedNote, noteTitle);
      this.setState({ newSubnote: '' });
    }
  };

  formatUpdatedNote = previousNote => {
    const { newSubnote } = this.state;
    const updatedNote = {
      createdAt: previousNote.createdAt,
      subnotes: previousNote.subnotes
    };
    updatedNote.subnotes.push(newSubnote);
    delete updatedNote.lastModified;
    return updatedNote;
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
