import React from 'react';

const EditNoteComp = ({
  noteTitle,
  subnotes,
  handleChange,
  handleSave,
  handleDeleteSubnote
}) => {
  const editTitle = (
    <div>
      <strong>Note Title</strong>
      <div className="input-group">
        <input
          className="form-control form-control-sm test"
          type="text"
          name="noteTitle"
          defaultValue={noteTitle}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const editSubnotes = (
    <div>
      <small>
        <strong className="text-muted">Bullet Points</strong>
      </small>
      {subnotes.map((subnote, index) => {
        return (
          <div className="input-group" key={`${subnote}${index}`}>
            <input
              type="text"
              className="form-control form-control-sm text-muted"
              name="subnotes"
              defaultValue={subnote}
              onChange={e => handleChange(e, index)}
            />
            <span className="input-group-btn">
              <button
                className="btn bg-white bin-button"
                type="button"
                value={index}
                name="delete"
                onClick={handleDeleteSubnote}
              >
                {'🗑️'}
              </button>
            </span>
          </div>
        );
      })}
    </div>
  );

  const editSave = (
    <div className="text-center">
      <button
        type="button"
        className="btn bg-light"
        name="save"
        onClick={handleSave}
      >
        {'✅'}
      </button>
    </div>
  );

  return (
    <div className="card mx-auto">
      <div className="card-body">
        {editTitle}
        {subnotes.length > 0 && editSubnotes}
        {editSave}
      </div>
    </div>
  );
};

export default EditNoteComp;
