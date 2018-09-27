import React from 'react';
import { Auth } from 'aws-amplify';

const SignOut = () => {
  return (
    <button className="dropdown-item" name="signout" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

const handleSignOut = () => {
  Auth.signOut()
    .then(() => window.location.reload())
    .catch(err => console.log('SIGN OUT ERROR >>>', err));
};

export default SignOut;
