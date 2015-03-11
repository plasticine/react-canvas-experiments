'use strict';

import React from 'react';
import canvas from 'react-canvas';

class App extends React.Component {
  render() {
    let size = this.getViewportSize();
    return (
      <canvas.Surface top={0} left={0} width={size.width} height={size.height}>
        {this.renderRoundRect()}
      </canvas.Surface>
    );
  }

  renderRoundRect() {
    let size = this.getViewportSize();
    let roundRectStyle = {
      width: 200,
      height: 200,
      top: (size.height / 2 - 100),
      left: (size.width / 2 - 100),
      backgroundColor: '#ccc',
      borderRadius: 10
    };
    return <canvas.Layer style={roundRectStyle} />;
  }

  getViewportSize() {
    return document.body.getBoundingClientRect();
  }

  // componentWillMount() {
  //   global.addEventListener('resize', this.handleViewportResize.bind(this), true)
  // }
  //
  // handleViewportResize() {
  //   this.forceUpdate();
  // }
}

React.render(<App/>, document.getElementById('App'));
