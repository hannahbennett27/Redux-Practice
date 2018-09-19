import React from 'react';
import { connect } from 'react-redux';
import { changePage } from '../actions';
import UserHomeNavBar from './UserHomeNavBar';

const mapDispatchToProps = dispatch => {
  return {
    changePage: page => dispatch(changePage(page))
  };
};

const UserHome = ({ changePage }) => {
  return (
    <div>
      <UserHomeNavBar />
      <p>*List of Notes here*</p>
      <button onClick={() => changePage('NewNote')}>Go to New Note</button>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(UserHome);
