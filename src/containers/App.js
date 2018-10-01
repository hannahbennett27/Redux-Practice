import Amplify /*, { Auth, Storage }*/ from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from '../aws-exports';
import React from 'react';
import '../App.css';
import { Header } from '../components';
import { ActivePage } from './';

Amplify.configure(aws_exports);

const App = () => {
  return (
    <div className="App">
      <Header />
      <ActivePage />
    </div>
  );
};

export default withAuthenticator(App);
// export default App;
