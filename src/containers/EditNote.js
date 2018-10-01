import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditNoteNavBar } from './';
import { EditNoteComp, Error, Loading } from '../components';
import { editNote } from '../actions';
import { getNoteTitle, getActiveNote } from '../utils';

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
    const { key, createdAt, subnotes } = getActiveNote(notes, activePage);
    const noteTitle = getNoteTitle(activePage);

    this.setState({
      originalKey: key,
      noteTitle,
      createdAt,
      subnotes
    });
  };

  render() {
    const { notesLoading, notesError } = this.props;

    return (
      <div>
        <EditNoteNavBar />
        {notesError && <Error />}
        {notesLoading && <Loading />}
        {!notesError &&
          !notesLoading && (
            <EditNoteComp
              {...this.state}
              handleChange={this.handleChange}
              handleSave={this.handleSave}
              handleDeleteSubnote={this.handleDeleteSubnote}
            />
          )}
      </div>
    );
  }

  handleChange = (e, index) => {
    console.log('change');
    let noteEdit = { ...this.state };
    if (index === undefined) noteEdit[e.target.name] = e.target.value;
    else noteEdit[e.target.name][index] = e.target.value;
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
