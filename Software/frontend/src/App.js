// frontend/src/App.js

import React, { Component } from "react";

import GpsView from './components/gps/gps_view.js';
import AccGyroView from './components/accgyro/accgyro_view.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };
  }

  render() {
    return (
      <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <GpsView />
              
            </div>
          </div>
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <AccGyroView />
            </div>
          </div>
        </div>
    );
  }
}
export default App