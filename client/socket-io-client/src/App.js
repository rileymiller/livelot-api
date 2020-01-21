import React, { Component } from "react";
import { subscribeToLot } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    subscribeToLot((err, lot) => this.setState({
      lot: lot.numSpots
    }));
  }

  state = {
    lot: ''
  };

  render() {
    const { lot } = this.state;
    return (
      <div className="App">
        <p className="App-intro">
        This is the lot value: {lot}
        </p>
      </div>
    );
  }
}
export default App;