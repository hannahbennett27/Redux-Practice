import Amplify /*, { Auth, Storage }*/ from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from '../aws-exports';
import React, { Component } from 'react';
import '../App.css';
import ActivePage from './ActivePage';

Amplify.configure(aws_exports);

class App extends Component {
  render() {
    const appHeader = (
      <header className="App-header">
        <h1 className="App-title">
          <strong>Notee Redux App</strong>
        </h1>
      </header>
    );

    return (
      <div className="App">
        {appHeader}
        <ActivePage />
      </div>
    );
  }
}

export default withAuthenticator(App);
// export default App;
