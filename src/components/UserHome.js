import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePage, retrieveNotes } from '../actions';
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
    retrieveNotes: () => retrieveNotes(dispatch)
  };
};

class UserHome extends Component {
  state = { firstRender: true };

  componentDidMount = () => {
    const { retrieveNotes } = this.props;
    retrieveNotes();
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
                <br />
                {note.subnotes.length ? `- ${note.subnotes[0]}` : '...'}
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
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHome);
