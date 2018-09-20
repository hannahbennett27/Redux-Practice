import React from 'react';
import { connect } from 'react-redux';
import { changePage } from '../actions';
import UserHomeNavBar from './UserHomeNavBar';

const mapStateToProps = state => {
  return { notes: state.notes };
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: page => dispatch(changePage(page))
  };
};

const UserHome = ({ notes, changePage }) => {
  return (
    <div>
      <UserHomeNavBar />

      {notes.map(note => {
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
                  {/* Last modified {note.lastModified.toDateString()}  // AMPLIFY DATE */}
                  <br />
                  Last modified {note.lastModified}
                  <br />- Content preview...?
                </small>
              </p>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHome);
