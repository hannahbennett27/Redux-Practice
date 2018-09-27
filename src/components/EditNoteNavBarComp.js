import React from 'react';

const EditNoteNavBarComp = ({ deleteNote, activePage, toggleIsEditing }) => {
  return (
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
          type="button"
          className="btn bg-light center"
          name="delete"
          onClick={() => deleteNote(activePage)}
        >
          {'🗑️'}
        </button>
      </div>
    </nav>
  );
};

export default EditNoteNavBarComp;
