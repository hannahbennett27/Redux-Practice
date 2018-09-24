import React, { Component } from 'react';
import { connect } from 'react-redux';
import NoteNavBar from './NoteNavBar';
import { addSubnote } from '../actions';

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
    addSubnote: (updatedNote, noteTitle) =>
      addSubnote(updatedNote, noteTitle, dispatch)
  };
};

class Note extends Component {
  state = { newSubnote: '' };

  render() {
    const { activePage, notes, notesLoading, notesError } = this.props;
    const { newSubnote } = this.state;
    const activeNote = notes.reduce((acc, el) => {
      if (el.key === activePage) acc = el;
      return acc;
    }, {});
    const titleRegExp = /(\D+).txt/;
    const noteTitle = titleRegExp.exec(activeNote.key)[1];
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
        {notesError ? (
          <p>ERROR</p>
        ) : notesLoading ? (
          <p>Note loading...</p>
        ) : (
          noteDisplay
        )}
      </div>
    );
  }

  handleChange = e => {
    this.setState({ newSubnote: e.target.value });
  };

  // addSubnote(updatedNote, noteTitle)
  handleEnter = (e, activeNote) => {
    if (e.which === 13) {
      const { addSubnote, activePage: noteTitle } = this.props;
      const updatedNote = this.formatUpdatedNote(activeNote);
      addSubnote(updatedNote, noteTitle);
      this.setState({ newSubnote: '' });
    }
  };

  formatUpdatedNote = previousNote => {
    const { newSubnote } = this.state;
    const updatedNote = previousNote;
    updatedNote.subnotes.push(newSubnote);
    delete updatedNote.lastModified;
    return updatedNote;
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
