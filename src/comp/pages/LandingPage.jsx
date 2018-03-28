import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import LNF from '../lnf';
import JSB from '../JSB';
import Dummy from '../Dummy';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.onInput = this.onInput.bind(this);
  }

  onInput(e) {
    this.setState({
      input: e.target.value,
    });
  }

  render() {
    const aStyle = StyleSheet.create({
      comp: {
        position: 'absolute',
        top: '100px',
        bottom: '50px',
        left: '20px',
        margin: '0',
        padding: '0px',
        color: '#0F0',
        backgroundColor: '#00F',
        fontSize: '24px',
      },
    });

    return (
      <div className={css(aStyle.comp)} >
        <LNF top={50} left={20} zIndex={6} >A</LNF>
        <LNF top={150} left={60} zIndex={4}>
          B
          <Dummy text={this.state.input} />
        </LNF>
        <LNF top={300} left={120} zIndex={1} >
          C
          <LNF top={0} left={500} zIndex={1} > D</LNF>
        </LNF>
        Seemed to work?
        <input onChange={this.onInput} />
      </div>
    );
  }
}
