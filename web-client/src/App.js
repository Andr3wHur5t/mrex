import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/header'
import JobsListing from './components/jobsListing'
import Cell from './components/cell'
import PostJob from './components/postJob'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Header/>
          <PostJob/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
