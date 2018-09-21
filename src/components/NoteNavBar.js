import React from 'react';
import { connect } from 'react-redux';
import { changePage, deleteNote } from '../actions';

const mapStateToProps = state => {
  return {
    activePage: state.activePage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: page => dispatch(changePage(page)),
    deleteNote: noteTitle => deleteNote(noteTitle, dispatch)
  };
};

const NoteNavBar = ({ changePage, deleteNote, activePage }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="input-group-prepend">
        <button
          className="btn bg-light"
          type="button"
          onClick={() => changePage('UserHome')}
        >
          Back
        </button>
      </div>

      <div className="input-group-append">
        <button
          type="button"
          className="btn bg-light"
          //   onClick={handle...}
        >
          Info
        </button>
        <button
          type="button"
          className="btn bg-light"
          //   onClick={handle...}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn bg-light"
          onClick={() => deleteNote(activePage)}
        >
          Delete
        </button>
      </div>
    </nav>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteNavBar);
