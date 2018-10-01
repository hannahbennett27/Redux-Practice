import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Error, Loading } from '../components';
import { retrieveNotes } from '../actions';
import { VisibleNotes, UserHomeNavBar } from './';

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
    Auth.currentSession()
      .then(res => {
        retrieveNotes();
      })
      .catch(err => console.log(err));
    // Auth.currentAuthenticatedUser()
    //   .then(user => {
    //     console.log(user);
    //     retrieveNotes();
    //   })
    //   .catch(err => console.log(err));
  };

  render() {
    const { notesLoading, notesError } = this.props;

    return (
      <div>
        <UserHomeNavBar />
        {notesError && <Error />}
        {notesLoading && <Loading />}
        {!notesError && !notesLoading && <VisibleNotes />}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHome);
