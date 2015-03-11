'use strict';

import React from 'react';
import canvas from 'react-canvas';

class App extends React.Component {
  render() {
    let size = this.getViewportSize();

    return (
      <canvas.Surface top={0} left={0} width={size.width} height={size.height}>
        <canvas.Image src="./caffeine.gif" fadeIn={true} style={this.getImageStyle()} />
      </canvas.Surface>
    );
  }

  getImageStyle() {
    let size = this.getViewportSize();

    return {
      width: 800,
      height: 800,
      top: (size.height / 2 - 400),
      left: (size.width / 2 - 400),
      borderRadius: 20
    };
  }

  getViewportSize() {
    return document.body.getBoundingClientRect();
  }

  componentWillMount() {
    global.addEventListener('resize', this.handleViewportResize.bind(this), true)
  }

  handleViewportResize() {
    this.forceUpdate();
  }
}

React.render(<App/>, document.getElementById('App'));
