import React from 'react';
import { Auth } from 'aws-amplify';

const SignOut = () => {
  return (
    <a href="# " className="dropdown-item" onClick={handleSignOut}>
      Sign Out
    </a>
  );
};

const handleSignOut = () => {
  Auth.signOut()
    .then(() => window.location.reload())
    .catch(err => console.log('SIGN OUT ERROR >>>', err));
};

export default SignOut;
