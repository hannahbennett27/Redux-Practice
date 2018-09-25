import React from 'react';
import { connect } from 'react-redux';
import { deleteNote, toggleIsEditing } from '../actions';

const mapStateToProps = state => {
  return {
    activePage: state.activePage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteNote: noteTitle => deleteNote(noteTitle, dispatch),
    toggleIsEditing: bool => dispatch(toggleIsEditing(bool))
  };
};

const EditNoteNavBar = ({ deleteNote, activePage, toggleIsEditing }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="input-group-prepend">
        <button
          className="btn bg-light"
          type="button"
          onClick={() => toggleIsEditing(false)}
        >
          {'⬅️'}
        </button>
      </div>
      <div className="input-group-append">
        <button
          type="button"
          className="btn bg-light center"
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
)(EditNoteNavBar);
