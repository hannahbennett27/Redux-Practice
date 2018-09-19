import React, { Component } from 'react';
import '../App.css';
import UserPage from './UserPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>
            <strong>Notee Redux App</strong>
          </h1>
        </header>
        <UserPage />
      </div>
    );
  }
}

export default App;
