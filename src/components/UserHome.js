import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Storage } from 'aws-amplify';
import { changePage, callError, callLoading, callSuccess } from '../actions';
import UserHomeNavBar from './UserHomeNavBar';

const mapStateToProps = state => {
  return {
    notes: state.notes,
    notesLoading: state.notesLoading,
    notesError: state.notesError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: page => dispatch(changePage(page)),
    callError: bool => dispatch(callError(bool)),
    callLoading: bool => dispatch(callLoading(bool)),
    callSuccess: res => dispatch(callSuccess(res))
    // Insert Storage call function here?
  };
};

class UserHome extends Component {
  componentDidMount = () => {
    this.thunkNotesTest();
  };

  render() {
    const { changePage, notes, notesLoading, notesError } = this.props;
    const notesDisplay = notes.map(note => {
      const titleRegExp = /(\D+).txt/;
      const noteTitle = titleRegExp.exec(note.key)[1];

      return (
        <div className="card mx-auto" key={note.eTag}>
          <button
            className="note-title-btn btn btn-link"
            onClick={() => changePage(note.key)}
          >
            <p className="card-body">
              <strong>{noteTitle}</strong>
              <small className="text-muted">
                <br />
                Last modified {note.lastModified.toDateString()}
                <br />- Content preview...?
              </small>
            </p>
          </button>
        </div>
      );
    });

    return (
      <div>
        <UserHomeNavBar />
        {notesError ? (
          <p>ERROR</p>
        ) : notesLoading ? (
          <p>Notes loading...</p>
        ) : (
          notesDisplay
        )}
        {this.thunkNotesTestTwo()}
      </div>
    );
  }

  // ==>> actions file??
  thunkNotesTest = () => {
    const { callError, callLoading, callSuccess } = this.props;
    callLoading(true);
    Storage.list('', { level: 'private' })
      .then(notes => {
        callLoading(false);
        return notes;
      })
      .then(notes => {
        callSuccess(notes);
      })
      .catch(error => callError(true));
  };

  thunkNotesTestTwo = () => {
    const { callError, callLoading, callSuccess } = this.props;
    // callLoading(true);
    Storage.list('', { level: 'private' })
      .then(notes =>
        // Promise.all(notes.map(note => this.retrieveNoteData(note)))
        notes.map(note => this.retrieveNoteData(note))
      )
      .then(noteData => console.log('NOTE DATA? >>>', noteData))
      .catch(err => console.log('Thunk Error'));
  };

  retrieveNoteData = note => {
    Storage.get(note.key, { level: 'private' })
      .then(noteURL => fetch(noteURL))
      .then(res => res.json())
      .then(noteData => {
        console.log({ ...note, ...noteData });
        return { ...note, ...noteData };
      });
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHome);
