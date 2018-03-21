/*jshint node:true */
"use strict";

import React from 'react';
import PolarChart from './PolarChart2.jsx';

class PolarInstrument extends React.Component {

  constructor(props) {
    super(props);
    this.app = props.app;
    this.state = {
      updaterate: props.updaterate
    };
  }

  static getDefaultProperties(app,  newTab, width, height) {
    return {
        updaterate: 1000,
        damping: 2
    }
  }

  static generateComponent(props, app) {
    return (
        <PolarInstrument
          updaterate={props.updaterate}
          app={app} 
          damping={props.damping} />
        );
  }

  componentWillReceiveProps(nextProps) {
    var newState = {};
    var update = false;
    for(var k in this.state) {
      if ( nextProps[k] !== undefined && this.state[k] !== nextProps[k]) {
        console.log("Prop Change ", { from: this.state[k], to: nextProps[k], allNewProps:nextProps});
        if ( typeof this.state[k] === 'number') {
          newState[k] = +nextProps[k];
        } else {
          newState[k] = nextProps[k];
        }
        update = true;
      }
    }
    if ( update ) {
        console.log("Setting State", { old: this.stat, newState: newState});
        this.setState(newState);
    }
  }


  render() {
    return (
        <div className="instrumentContainer"  >
          <PolarChart northup={this.state.northup} app={this.app} updaterate={this.state.updaterate} width="620" height="620" />
        </div>
    );
  }

}

export default PolarInstrument;