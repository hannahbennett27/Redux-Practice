import React from 'react';
import { connect } from 'react-redux';
import { deleteNote, toggleIsEditing } from '../actions';
// import EditNoteNavBarComp from '../components/EditNoteNavBarComp';

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

export const EditNoteNavBar = ({ deleteNote, activePage, toggleIsEditing }) => {
  return (
    // <EditNoteNavBarComp
    //   deleteNote={deleteNote}
    //   activePage={activePage}
    //   toggleIsEditing={toggleIsEditing}
    // />

    <nav className="navbar navbar-light bg-light">
      <div className="input-group-prepend">
        <button
          className="btn bg-light"
          type="button"
          name="back"
          onClick={() => toggleIsEditing(false)}
        >
          {'⬅️'}
        </button>
      </div>
      <div className="input-group-append">
        <button
          className="btn bg-light center"
          type="button"
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
)(EditNoteNavBar);
