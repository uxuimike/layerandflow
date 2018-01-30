import React, { Component } from 'react';

import { StyleSheet, css } from 'aphrodite/no-important';

export default class LandingPage extends Component {
  render(){

    const aStyle = StyleSheet.create({
      comp: {
        position: 'fixed',
        top: '20px',
        left: '20px',
        height: '150px',
        width: '500px',
        margin: '0px',
        padding: '0px',
        color: '#0F0',
        backgroundColor: '#00F',
        fontSize: '24px',
      },
    });

    return(
      <div className={css(aStyle.comp)}>
        Landing Page
        ajshd hlsjdh akjhd akhd kah dkahdakj dhkah sdasd
      </div>
    )
  }

}
