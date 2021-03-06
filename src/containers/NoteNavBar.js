import React from 'react';
import { connect } from 'react-redux';
import { changePage, deleteNote, toggleIsEditing } from '../actions';

const mapStateToProps = state => {
  return {
    activePage: state.activePage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: page => dispatch(changePage(page)),
    deleteNote: noteTitle => deleteNote(noteTitle, dispatch),
    toggleIsEditing: bool => dispatch(toggleIsEditing(bool))
  };
};

export const NoteNavBar = ({
  changePage,
  deleteNote,
  activePage,
  toggleIsEditing
}) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="input-group-prepend">
        <button
          className="btn bg-light"
          type="button"
          name="back"
          onClick={() => changePage('UserHome')}
        >
          {'⬅️'}
        </button>
      </div>

      <div className="input-group-append">
        <button
          type="button"
          className="btn bg-light"
          name="info"
          //   onClick={handle...}
        >
          {'ℹ️'}
        </button>
        <button
          type="button"
          className="btn bg-light"
          name="edit"
          onClick={() => toggleIsEditing(true)}
        >
          {'🖋️'}
        </button>
        <button
          type="button"
          className="btn bg-light"
          name="delete"
          onClick={() => deleteNote(activePage)}
        >
          {'🗑️'}
        </button>
      </div>
    </nav>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteNavBar);
