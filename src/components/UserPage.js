import React from 'react';
import { connect } from 'react-redux';
import PageOne from './PageOne';
import PageTwo from './PageTwo';

const mapStateToProps = state => {
  return { activePage: state.activePage };
};

const UserPage = ({ activePage }) => {
  switch (activePage) {
    case 'PageOne':
      return <PageOne />;
    case 'PageTwo':
      return <PageTwo />;
    default:
      return <div>Default Page</div>;
  }
};

export default connect(mapStateToProps)(UserPage);
