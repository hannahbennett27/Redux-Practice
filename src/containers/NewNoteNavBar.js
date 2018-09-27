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

const NewNoteNavBar = ({
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

      <div className="input-group-append" />
    </nav>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNoteNavBar);
