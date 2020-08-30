// frontend/src/App.js

import React, { Component } from "react";

import RoverHomepageView from './components/rover_homepage/rover_homepage_view.js';
import ArmHomepageView from './components/arm_homepage/arm_homepage_view.js';
import ScienceHomepageView from './components/science_homepage/science_homepage_view.js';

class App extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      viewid: 0
    };
  }

  // sets viewid
  setViewId(id){
    this.setState({viewid:id})
  }

  // returns homepage view based in viewid
  renderView(){
    if (this.state.viewid == 0){
      return (<RoverHomepageView />);
    }
    else if (this.state.viewid == 1){
      return (<ArmHomepageView />);
    }
    else if (this.state.viewid == 2){
      return (<ScienceHomepageView />);
    }
    else {
      return (<div className="error_message"><p>CANNOT RENDER VIEWID: {this.state.viewid}</p></div>)
    }
  }

  // This function returns the div that we want to render
  renderItems = () => {
    return (
      <div>
        <div className="row">
          <div className="navbar">
            <button type="button" className="navbar_button" onClick={() => this.setViewId(0)}>  
              Rover View
            </button>
            <button className="navbar_button" onClick={() => this.setViewId(1)}>  
              Arm View
            </button>
            <button className="navbar_button" onClick={() => this.setViewId(2)}>  
              Science View
            </button>
          </div>
        </div>
        {this.renderView()}
      </div>
    );
  };

  // Returns jsx to render the item in react
  render() {
    return (
      <div className="root">
        {this.renderItems()}
      </div>
    );
  }
}
export default App