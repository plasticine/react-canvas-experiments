'use strict';

import React from 'react';
import { Surface, ListView } from 'react-canvas';
import Page from './components/PageComponent';
import data from './data';

const ITEMS_PER_PAGE = 2;

class App extends React.Component {
  render() {
    let size = this.getViewportSize();

    return (
      <Surface top={0} left={0} width={size.width} height={size.height}>
        <ListView
          style={this.getListViewStyle()}
          snapping={true}
          scrollingDeceleration={0.92}
          scrollingPenetrationAcceleration={0.13}
          numberOfItemsGetter={this.getNumberOfPages.bind(this)}
          itemHeightGetter={this.getItemHeight.bind(this)}
          itemGetter={this.renderPage.bind(this)} />
      </Surface>
    );
  }

  renderPage(pageIndex, scrollTop) {
    let size = this.getViewportSize();
    let article = data[pageIndex % data.length];
    let pageScrollTop = pageIndex * this.getViewportHeight() - scrollTop;

    return (
      <Page
        width={size.width}
        height={size.height / ITEMS_PER_PAGE}
        article={article}
        pageIndex={pageIndex}
        scrollTop={pageScrollTop} />
    );
  }

  getItemHeight() {
    return this.getViewportSize().height / ITEMS_PER_PAGE;
  }

  getListViewStyle() {
    let size = this.getViewportSize();

    return {
      top: 0,
      left: 0,
      width: size.width,
      height: size.height
    };
  }

  getNumberOfPages() {
    return 1000;
  }

  getViewportHeight() {
    return this.getViewportSize().height;
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
