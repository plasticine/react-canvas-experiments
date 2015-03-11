'use strict';

import React from 'react';
import { Group, Image, Text, FontFace, measureText } from 'react-canvas';

const CONTENT_INSET = 14;
const TEXT_SCROLL_SPEED_MULTIPLIER = 0.6;
const TEXT_ALPHA_SPEED_OUT_MULTIPLIER = 1.25;
const TEXT_ALPHA_SPEED_IN_MULTIPLIER = 2.6;
const IMAGE_LAYER_INDEX = 2;
const TEXT_LAYER_INDEX = 1;

export default class Page extends React.Component {
  componentWillMount() {
    let article = this.props.article;
    let maxWidth = this.props.width - 2 * CONTENT_INSET;
    let titleStyle = this.getTitleStyle();
    let excerptStyle = this.getExcerptStyle();
    this.titleMetrics = measureText(article.title, maxWidth, titleStyle.fontFace, titleStyle.fontSize, titleStyle.lineHeight);
    this.excerptMetrics = measureText(article.excerpt, maxWidth, excerptStyle.fontFace, excerptStyle.fontSize, excerptStyle.lineHeight);
  }

  render() {
    let groupStyle = this.getGroupStyle();
    let imageStyle = this.getImageStyle();
    let titleStyle = this.getTitleStyle();
    let excerptStyle = this.getExcerptStyle();

    // Layout title and excerpt below image.
    titleStyle.height = this.titleMetrics.height;
    excerptStyle.top = titleStyle.top + titleStyle.height + CONTENT_INSET;
    excerptStyle.height = this.props.height - excerptStyle.top - CONTENT_INSET;

    return (
      <Group style={groupStyle}>
        <Image style={imageStyle} src={this.props.article.imageUrl} fadeIn={true} useBackingStore={true} />
        <Group style={this.getTextGroupStyle()} useBackingStore={true}>
          <Text style={titleStyle}>{this.props.article.title}</Text>
          <Text style={excerptStyle}>{this.props.article.excerpt}</Text>
        </Group>
      </Group>
    );
  }

  getGroupStyle() {
    return {
      top: 0,
      left: 0,
      width: this.props.width,
      height: this.props.height
    };
  }

  getImageHeight() {
    return Math.round(this.props.height * 0.5);
  }

  getImageStyle() {
    return {
      top: 0,
      left: 0,
      width: this.props.width,
      height: this.getImageHeight(),
      zIndex: IMAGE_LAYER_INDEX,
      backgroundColor: '#eee'
    };
  }

  getTitleStyle() {
    return {
      top: this.getImageHeight() + CONTENT_INSET,
      left: CONTENT_INSET,
      width: this.props.width - 2 * CONTENT_INSET,
      fontSize: 38,
      lineHeight: 56,
      fontFace: FontFace('Proxima Nova, Helvetica, sans-serif', null, {weight: 700})
    };
  }

  getExcerptStyle() {
    return {
      left: CONTENT_INSET,
      width: this.props.width - 2 * CONTENT_INSET,
      fontFace: FontFace('Georgia, serif'),
      fontSize: 20,
      lineHeight: 33,
    };
  }

  getTextGroupStyle() {
    let imageHeight = this.getImageHeight();
    let translateY = 0;
    let alphaMultiplier = (this.props.scrollTop <= 0) ? -TEXT_ALPHA_SPEED_OUT_MULTIPLIER : TEXT_ALPHA_SPEED_IN_MULTIPLIER;
    let alpha = 1 - (this.props.scrollTop / this.props.height) * alphaMultiplier;
    alpha = Math.min(Math.max(alpha, 0), 1);
    translateY = -this.props.scrollTop * TEXT_SCROLL_SPEED_MULTIPLIER;

    return {
      width: this.props.width,
      height: this.props.height - imageHeight,
      top: imageHeight,
      left: 0,
      alpha: 1,
      // translateY: translateY,
      zIndex: TEXT_LAYER_INDEX
    };
  }
}
