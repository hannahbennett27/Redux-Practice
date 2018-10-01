import React from 'react';
import { connect } from 'react-redux';
import { UserHome, NewNote, Note, EditNote } from './';
import { Error } from '../components';
import { isNoteActive } from '../utils';

const mapStateToProps = state => {
  return {
    activePage: state.activePage,
    isEditing: state.isEditing
  };
};

const pageSwitch = (activePage, isEditing) => {
  if (isNoteActive(activePage)) {
    return isEditing ? 'EditNote' : 'Note';
  } else return activePage;
};

const activePage = ({ activePage, isEditing }) => {
  const page = pageSwitch(activePage, isEditing);
  switch (page) {
    case 'UserHome':
      return <UserHome />;
    case 'NewNote':
      return <NewNote />;
    case 'Note':
      return <Note />;
    case 'EditNote':
      return <EditNote />;
    default:
      return <Error />;
  }
};

export default connect(mapStateToProps)(activePage);
