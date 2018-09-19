import React from 'react';
import { connect } from 'react-redux';
import { changePage } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    changePage: page => dispatch(changePage(page))
  };
};

const PageTwo = ({ changePage }) => {
  return (
    <div>
      <p>Page Two Here</p>
      <button onClick={() => changePage('PageOne')}>Go to Page One</button>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(PageTwo);
