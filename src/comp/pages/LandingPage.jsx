import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { init } from '../../lnf/LNF';
import Dummy from '../Dummy';
import LNF from '../lnf';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.onInput = this.onInput.bind(this);
  }

  componentDidMount() {
    init();
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
        <LNF top={400} left={200} zIndex={1} name="D" pin="C" />
        <LNF top={300} left={150} zIndex={1} name="C" pin="B" />
        <LNF top={200} left={100} zIndex={4} name="B" pin="A" />
        <LNF top={100} left={50} zIndex={6} name="A" />
        Seemed to work?
        <input onChange={this.onInput} />
      </div>
    );
  }
}
