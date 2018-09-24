import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveNotes } from '../actions';
import VisibleNotes from './VisibleNotes';
import UserHomeNavBar from './UserHomeNavBar';

const mapStateToProps = state => {
  return {
    notesLoading: state.notesLoading,
    notesError: state.notesError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    retrieveNotes: () => retrieveNotes(dispatch)
  };
};

class UserHome extends Component {
  componentDidMount = () => {
    const { retrieveNotes } = this.props;
    retrieveNotes();
  };

  render() {
    const { notesLoading, notesError } = this.props;

    return (
      <div>
        <UserHomeNavBar />
        {notesError ? (
          <p>ERROR</p>
        ) : notesLoading ? (
          <p>Notes loading...</p>
        ) : (
          <VisibleNotes />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHome);
