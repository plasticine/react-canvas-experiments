'use strict';

import React from 'react';
import {Surface, Group, Text, Image, FontFace, measureText} from 'react-canvas';

class App extends React.Component {
  render() {
    let size = this.getSize();

    return (
      <Surface top={0} left={0} width={size.width} height={size.height} enableCSSLayout={true}>
        <Group style={this.getPageStyle()}>
          <Group style={this.getTitleGroupStyle()}>
            <Text style={this.getTitleStyle()}>
              Check Yourself Before You Wreck Yourself
            </Text>
          </Group>
          <Group style={this.getImageGroupStyle()}>
            <Image src='./image.jpg' style={this.getImageStyle()} fadeIn={true} />
          </Group>
          <Group style={this.getExcerptGroupStyle()}>
            <Text style={this.getExcerptStyle()}>
              With these words the Witch fell down in a brown, melted, shapeless mass and began to spread over the clean boards of the kitchen floor.  Seeing that she had really melted away to nothing, Dorothy drew another bucket of water and threw it over the mess.  She then swept it all out the door.  After picking out the silver shoe, which was all that was left of the old woman, she cleaned and dried it with a cloth, and put it on her foot again.  Then, being at last free to do as she chose, she ran out to the courtyard to tell the Lion that the Wicked Witch of the West had come to an end, and that they were no longer prisoners in a strange land.
            </Text>
          </Group>
        </Group>
      </Surface>
    );
  }

  getPageStyle() {
    let size = this.getSize();

    return {
      position: 'relative',
      width: size.width,
      height: size.height,
      backgroundColor: '#001F3F',
      flexDirection: 'column'
    };
  }

  getImageGroupStyle() {
    return {
      position: 'relative',
      flex: 1,
      backgroundColor: '#ccc'
    };
  }

  getImageStyle() {
    return {
      flex: 1,
      top: 50
    };
  }

  getTitleGroupStyle() {
    return {
      flex: 0,
      padding: 32,
      height: 100,
      backgroundColor: '#0074D9'
    };
  }

  getTitleStyle() {
    return {
      flex: 1,
      fontFace: FontFace('Proxima Nova', null, {weight: 700}),
      fontSize: 26,
      color: '#B3DCFF',
      textAlign: 'center'
    };
  }

  getExcerptGroupStyle() {
    return {
      flex: 1,
      backgroundColor: '#7FDBFF',
      padding: 50
    };
  }

  getExcerptStyle() {
    return {
      flex: 1,
      fontFace: FontFace('Proxima Nova', null, {weight: 500}),
      fontSize: 24,
      lineHeight: 36,
      color: '#004966'
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
