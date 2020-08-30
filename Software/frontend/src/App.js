// frontend/src/App.js

import React, { Component } from "react";

import RoverHomepageView from './components/rover_homepage/rover_homepage_view.js';
import ArmHomepageView from './components/arm_homepage/arm_homepage_view.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewid: 0
    };
  }

  setView(id){
    this.setState({viewid:id})
  }

  renderView(){
    if (this.state.viewid == 0){
      return (<RoverHomepageView />);
    }
    else if (this.state.viewid == 1){
      return (<ArmHomepageView />);
    }
    else {
      return (<div className="error_message"><p>CANNOT RENDER VIEWID: {this.state.viewid}</p></div>)
    }
  }

  render() {
    return (
      <div className="root">
        <div className="row">
          <div className="navbar">
            <button variant="primary" onClick={() => this.setState({viewid:0})}>  
              Rover View
            </button>
            <button variant="primary" onClick={() => this.setView(1)}>  
              Arm View
            </button>
            <button variant="primary" onClick={() => this.setView(2)}>  
              Science View
            </button>
          </div>
        </div>
        {this.renderView()}
      </div>
    );
  }
}
export default App