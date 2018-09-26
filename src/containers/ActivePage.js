import React from 'react';
import { connect } from 'react-redux';
import UserHome from './UserHome';
import NewNote from './NewNote';
import Note from './Note';
import EditNote from './EditNote';

const mapStateToProps = state => {
  return {
    activePage: state.activePage,
    isEditing: state.isEditing
  };
};

const activePage = ({ activePage, isEditing }) => {
  const noteRegExp = /.+.txt/;

  switch (activePage) {
    case 'UserHome':
      return <UserHome />;
    case 'NewNote':
      return <NewNote />;
    default:
      return noteRegExp.test(activePage) ? (
        isEditing ? (
          <EditNote />
        ) : (
          <Note />
        )
      ) : (
        <div>Default Page</div>
      );
  }
};

export default connect(mapStateToProps)(activePage);
