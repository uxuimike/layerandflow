import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import uid from 'uid';
import { StyleSheet, css } from 'aphrodite/no-important';

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
    const aStyle = StyleSheet.create({
      lnf: {
        position: 'absolute',
        boxSizing: 'border-box',
        border: '2px solid rgba(0, 102, 0, 0.5)',
        top: `${this.props.top}px`,
        left: `${this.props.left}px`,
        height: '60px',
        zIndex: this.props.zIndex,
        margin: '0 0 0 0',
        padding: '0px',
        color: '#808080',
        backgroundColor: 'rgba(0, 204, 204, 1)',
        fontSize: '24px',
      },
    });

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
