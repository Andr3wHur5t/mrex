import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Header from './components/header'
import Cell from './components/cell'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Header/>
          <RaisedButton label="Default" />
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
