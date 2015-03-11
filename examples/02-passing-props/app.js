'use strict';

import React from 'react';
import CanvasComponent from './components/CanvasComponent';

class App extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      message: 'Hello? This is Dog!?'
    };
  }

  render() {
    return (
      <div>
        <input style={this.inputStyle()} type="text" name="message" placeholder="Message" onChange={this.handleChange} value={this.state.message} />
        <CanvasComponent message={this.state.message} />
      </div>
    );
  }

  inputStyle() {
    return {
      position: 'absolute',
      display: 'block',
      top: 20,
      right: 20,
      left: 20,
      fontSize: 32,
      padding: 10,
      zIndex: 2
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({message: event.target.value});
  }
}

React.render(<App/>, document.getElementById('App'));
