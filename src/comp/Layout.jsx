import React, { Component } from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';

import LandingPage from './pages/LandingPage';

import { init } from '../lnf/LNF';

@inject('styles')
export default class Layout extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll);
    this.onResize();
    init();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
  }

  onResize() {
    let sf = 1;
    const cw = window.innerWidth;
    const ch = window.innerHeight;

    if (cw > ch) {
      sf = (ch) / 640;
    } else {
      sf = (cw) / 640;
    }

    if (sf > 1) {
      sf = 1;
    }
    document.documentElement.style.fontSize = `${sf}px`;
    this.props.styles.setWidth(cw);
  }

  render() {
    return (
      <div className="App" >
        <LandingPage />
      </div>

    );
  }
}
