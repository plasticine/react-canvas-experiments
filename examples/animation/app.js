'use strict';

import React from 'react';
import canvas from 'react-canvas';
import Rebound from 'rebound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 1.5
    }
  }

  componentWillMount() {
    var springSystem = new Rebound.SpringSystem();
    this.spring = springSystem.createSpring(50, 3);
    this.spring.addListener({
      onSpringUpdate: (spring) => {
        let scale = Rebound.MathUtil.mapValueInRange(spring.getCurrentValue(), 1, 2, 1, 0.5);
        this.setState({scale: scale});
      }
    });
    global.addEventListener('resize', this.handleViewportResize.bind(this), true)
  }

  render() {
    let size = this.getViewportSize();
    return (
      <canvas.Surface top={0} left={0} width={size.width} height={size.height}>
        {this.renderAwesomeCircle()}
      </canvas.Surface>
    );
  }

  renderAwesomeCircle() {
    let size = this.getViewportSize();
    let roundRectStyle = {
      width: 200 * this.state.scale,
      height: 200 * this.state.scale,
      top: (size.height / 2 - 100),
      left: (size.width / 2 - 100),
      backgroundColor: 'red',
      borderRadius: 100 * this.state.scale / 2,
      zIndex: 2
    };
    return (
      <canvas.Layer
        style={roundRectStyle}
        onTouchStart={this.handleTouchStart.bind(this)}
        onTouchEnd={this.handleTouchEnd.bind(this)} />
    );
  }

  handleTouchStart(event) {
    this.spring.setEndValue(1);
    event.preventDefault()
  }

  handleTouchEnd(event) {
    this.spring.setEndValue(0);
    event.preventDefault()
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
    return (
      <canvas.Layer style={roundRectStyle} />
    );
  }

  getViewportSize() {
    return document.body.getBoundingClientRect();
  }

  handleViewportResize() {
    this.forceUpdate();
  }
}

React.render(<App/>, document.body);
