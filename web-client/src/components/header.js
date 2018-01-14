import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

class Header extends Component {

  render() {
    return (
      <div style={{color: this.props.muiTheme.palette.accent1Color}} className="appHeader">
        <h1>Blocked Tasks</h1>
        <p style={{color: this.props.muiTheme.palette.accent3Color}}>
          Need some help around the house or at work?  Find help on the blockchain!
        </p>
      </div>
    );
  }
}

export default muiThemeable()(Header);

