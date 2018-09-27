import React from 'react';
import { connect } from 'react-redux';
import { changePage } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    changePage: page => dispatch(changePage(page))
  };
};

export const NewNoteNavBar = ({ changePage }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="input-group-prepend">
        <button
          className="btn bg-light"
          type="button"
          name="back"
          onClick={() => changePage('UserHome')}
        >
          {'⬅️'}
        </button>
      </div>
    </nav>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(NewNoteNavBar);
