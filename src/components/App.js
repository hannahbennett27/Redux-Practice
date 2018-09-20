import React, { Component } from 'react';
import '../App.css';
import ActivePage from './ActivePage';

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

export default App;
