import React from 'react';
import { connect } from 'react-redux';
import UserHome from './UserHome';
import NewNote from './NewNote';
import Note from './Note';

const mapStateToProps = state => {
  return { activePage: state.activePage }; // FIX NESTED STATE! => COMPARE TO TODO EXAMPLE
};

const activePage = ({ activePage }) => {
  const noteRegExp = /\D+.txt/;

  switch (activePage) {
    case 'UserHome':
      return <UserHome />;
    case 'NewNote':
      return <NewNote />;
    default:
      return noteRegExp.test(activePage) ? <Note /> : <div>Default Page</div>;
  }
};

export default connect(mapStateToProps)(activePage);