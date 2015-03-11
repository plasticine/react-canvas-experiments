'use strict';

import React from 'react';
import canvas from 'react-canvas';

export default class CanvasComponent extends React.Component {
  render() {
    let size = this.getViewportSize();
    let textStyle = this.textStyle();
    let roundRectStyle = this.roundRectStyle();

    let textMetrics = canvas.measureText(this.props.message, size.width, textStyle.fontFace, textStyle.fontSize, textStyle.lineHeight);
    textStyle.height = textMetrics.height;
    textStyle.width = textMetrics.width;
    textStyle.top = (roundRectStyle.top + roundRectStyle.height / 2) - textMetrics.height / 2
    textStyle.left = (roundRectStyle.left + roundRectStyle.width / 2) - textMetrics.width / 2

    return (
      <canvas.Surface top={0} lzeft={0} width={size.width} height={size.height}>
        <canvas.Layer style={roundRectStyle}/>
        <canvas.Text style={textStyle}>
          {this.props.message}
        </canvas.Text>
      </canvas.Surface>
    );
  }

  roundRectStyle() {
    let size = this.getViewportSize();
    return {
      width: 600,
      height: 200,
      top: (size.height / 2 - 100),
      left: (size.width / 2 - 300),
      backgroundColor: '#BB606B',
      borderRadius: 10
    };
  }

  textStyle() {
    let size = this.getViewportSize();
    return {
      // width: 600,
      // height: 200,
      fontFace: canvas.FontFace('Helvetica', null, {weight: 700}),
      fontSize: 48,
      lineHeight: 64,
      textAlign: 'center',
      color: '#F8F8F8',
      // top: (size.height / 2 - 100),
      // left: (size.width / 2 - 300),
      backgroundColor: 'rgba(0,0,0,0.25)'  // rgba() works just fine too!
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
