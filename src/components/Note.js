import React from 'react';
import { connect } from 'react-redux';
import { changePage } from '../actions';
import NoteNavBar from './NoteNavBar';

const mapDispatchToProps = dispatch => {
  return {
    changePage: page => dispatch(changePage(page))
  };
};

const Note = ({ changePage }) => {
  return (
    <div>
      <NoteNavBar />
      <p>Note page here</p>
      <button onClick={() => changePage('UserHome')}>Go to User Home</button>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Note);
