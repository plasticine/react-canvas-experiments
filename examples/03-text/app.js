'use strict';

import React from 'react';
import {Surface, Group, Text, FontFace, measureText} from 'react-canvas';

const CONTENT = `With these words the Witch fell down in a brown, melted,
shapeless mass and began to spread over the clean boards of the kitchen floor.
Seeing that she had really melted away to nothing, Dorothy drew another bucket
of water and threw it over the mess. She then swept it all out the door. After
picking out the silver shoe, which was all that was left of the old woman, she
cleaned and dried it with a cloth, and put it on her foot again. Then, being at
last free to do as she chose, she ran out to the courtyard to tell the Lion
that the Wicked Witch of the West had come to an end, and that they were no
longer prisoners in a strange land.`

class App extends React.Component {
  render() {
    let size = this.getSize();
    let pageStyle = this.getPageStyle()
    let bodyTextStyle = this.getBodyTextStyle();
    let contentMetrics = measureText(CONTENT, size.width, bodyTextStyle.fontFace, bodyTextStyle.fontSize, bodyTextStyle.lineHeight);
    bodyTextStyle.height = contentMetrics.height;
    bodyTextStyle.width = size.width;

    return (
      <Surface top={0} left={0} width={size.width} height={size.height}>
        <Layer style={pageStyle}>
          <Text style={headerTextStyle}>{CONTENT}</Text>
        </Layer>
      </Surface>
    );
  }

  getPageStyle() {
    let size = this.getSize();
    return {
      position: 'relative',
      padding: 0,
      width: size.width,
      height: size.height
    };
  }

  getBodyTextStyle() {
    return {
      fontFace: FontFace('Proxima Nova', null, {weight: 700}),
      fontSize: 18,
      lineHeight: 28,
      marginTop: 15,
      backgroundColor: '#96C5DC',
      color: '#25477D'
    };
  }

  getSize() {
    return document.body.getBoundingClientRect();
  }

  componentDidMount() {
    global.addEventListener('resize', this.handleResize.bind(this), true);
  }

  handleResize() {
    this.forceUpdate();
  }
}

React.render(<App/>, document.getElementById('App'));
