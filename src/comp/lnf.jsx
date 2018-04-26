import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import uid from 'uid';
import { StyleSheet, css } from 'aphrodite/no-important';

import { init, lnf, update } from '../lnf/LNF';

@inject('styles')
export default class LnF extends Component {
  static propTypes = {
    top: PropTypes.number,
    left: PropTypes.number,
    zIndex: PropTypes.number,
    name: PropTypes.string.isRequired,
    pin: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
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
    init();
  }

  onDrop() {
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
        className={css(aStyle.lnf)}
        draggable
        onDrop={this.onDrop}
        onDragOver={(e) => { e.preventDefault(); }}
        id={
          lnf({
            id: this.props.name,
            top: { pinTo: this.props.pin, pinToAnchorPoint: 'bottom', offset: '20px' },
            left: { pinTo: this.props.pin, pinToAnchorPoint: 'right', offset: '20px' },
          })
        }
      >
        <h1>Uid:{this.state.uid}</h1>
        <h2>Width:{this.state.width}</h2>
        <p>Updates:{this.state.count}</p>
        {this.props.children}
      </div>
    );
  }
}
