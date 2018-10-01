import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditNoteNavBar from './EditNoteNavBar';
import { EditNoteComp } from '../components';
import { editNote } from '../actions';
import { getNoteTitle } from '../utils';

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
    const noteTitle = getNoteTitle(activeNote);
    const { key, createdAt, subnotes } = activeNote;
    this.setState({
      originalKey: key,
      noteTitle,
      createdAt,
      subnotes
    });
  };

  render() {
    const { notesLoading, notesError } = this.props;
    // const displayLookUp = {}
    return (
      <div>
        <EditNoteNavBar />
        {notesError && <p>ERROR</p>}
        {notesLoading && <p>Note loading...</p>}
        {!notesError && !notesLoading && <EditNoteComp {...this.state} />}
      </div>
    );
  }

  handleChange = (e, index) => {
    let noteEdit = { ...this.state };
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
