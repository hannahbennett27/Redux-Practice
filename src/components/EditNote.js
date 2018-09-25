import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditNoteNavBar from './EditNoteNavBar';
import { editNote } from '../actions';

const mapStateToProps = state => {
  return {
    activePage: state.activePage,
    notes: state.notes,
    notesLoading: state.notesLoading,
    notesError: state.notesError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editNote: (originalTitle, updatedNote, noteTitle) =>
      editNote(originalTitle, updatedNote, noteTitle, dispatch)
  };
};

class EditNote extends Component {
  state = {
    originalKey: '',
    noteTitle: '',
    createdAt: '',
    subnotes: []
  };

  componentDidMount = () => {
    const { activePage, notes } = this.props;
    const activeNote = notes.reduce((acc, el) => {
      if (el.key === activePage) acc = el;
      return acc;
    }, {});
    const titleRegExp = /(\D+).txt/;
    const noteTitle = titleRegExp.exec(activeNote.key)[1];

    this.setState({
      originalKey: activeNote.key,
      noteTitle,
      createdAt: activeNote.createdAt,
      subnotes: activeNote.subnotes
    });
  };

  render() {
    const { notesLoading, notesError } = this.props;
    const noteDisplay = () => {
      const { noteTitle, subnotes } = this.state;
      if (noteTitle) {
        return (
          <div className="card mx-auto">
            <div className="card-body">
              <strong>Note Title</strong>
              <div className="input-group">
                <input
                  className="form-control form-control-sm test"
                  type="text"
                  name="noteTitle"
                  defaultValue={noteTitle}
                  onChange={this.handleChange}
                />
              </div>
              {subnotes.length ? (
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
                          // index={index}
                          defaultValue={subnote}
                          onChange={e => this.handleChange(e, index)}
                        />
                        <span className="input-group-btn">
                          <button
                            className="btn bg-white bin-button"
                            type="button"
                            value={index}
                            onClick={this.handleDeleteSubnote}
                          >
                            {'🗑️'}
                          </button>
                        </span>
                      </div>
                    );
                  })}{' '}
                </div>
              ) : null}
              <div className="text-center">
                <button
                  type="button"
                  className="btn bg-light"
                  onClick={this.handleSave}
                >
                  {'✅'}
                </button>
              </div>
            </div>
          </div>
        );
      }
    };

    return (
      <div>
        <EditNoteNavBar />
        {notesError ? (
          <p>ERROR</p>
        ) : notesLoading ? (
          <p>Note loading...</p>
        ) : (
          noteDisplay()
        )}
      </div>
    );
  }

  handleChange = (e, index) => {
    let noteEdit = this.state;
    index !== undefined
      ? (noteEdit[e.target.name][index] = e.target.value)
      : (noteEdit[e.target.name] = e.target.value);
    this.setState(noteEdit);
  };

  handleSave = () => {
    const { editNote } = this.props;
    const { originalKey, noteTitle, createdAt, subnotes } = this.state;
    const updatedNote = { createdAt, subnotes };
    editNote(originalKey, updatedNote, `${noteTitle}.txt`);
  };

  handleDeleteSubnote = e => {
    const updatedState = this.state;
    updatedState.subnotes.splice(e.target.value, 1);
    this.setState(updatedState);
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditNote);
