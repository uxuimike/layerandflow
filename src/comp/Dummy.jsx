import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

@inject('styles')
export default class Dummy extends Component {
  static propTypes = {
    text: PropTypes.string,
  }

  static defaultProps = {
    text: '',
  }

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return [
      this.props.text,
    ];
  }
}
