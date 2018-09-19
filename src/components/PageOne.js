import React from 'react';
import { connect } from 'react-redux';
import { changePage } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    changePage: page => dispatch(changePage(page))
  };
};

const PageOne = ({ changePage }) => {
  return (
    <div>
      <p>Page One Here</p>
      <button onClick={() => changePage('PageTwo')}>Go to Page Two</button>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(PageOne);
