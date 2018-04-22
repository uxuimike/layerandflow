import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import uid from 'uid';

import { init, update } from '../lnf/LNF';

@inject('styles')
export default class Other extends Component {
  static propTypes = {
    top: PropTypes.number,
    left: PropTypes.number,
    zIndex: PropTypes.number,
    children: PropTypes.object,
  }

  static defaultProps = {
    top: 0,
    left: 0,
    zIndex: 0,
    children: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      uid: uid(),
      width: 0,
      count: 0,
    };
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    init(this.node);
  }

  componentDidUpdate() {
    update(this.state.uid);
    if (this.node.offsetWidth !== this.state.width) {
      this.setState({
        count: this.state.count + 1,
        width: this.node.offsetWidth,
      })
    }
  }

  onDrop() {
    console.log('Dropped Into', this.state.uid);
    update(this.state.uid);
  }

  render() {
    return (
      <div
        ref={(node) => { this.node = node; }}
        draggable
        onDrop={this.onDrop}
        onDragOver={(e) => { e.preventDefault(); }}
      >
        JSB
        <p>Uid:{this.state.uid}</p>
        <p>Width:{this.state.width}</p>
        <p>Updates:{this.state.count}</p>
        {this.props.children}
      </div>
    );
  }
}
