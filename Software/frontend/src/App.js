// frontend/src/App.js

import React, { Component } from "react";

import GpsView from './components/gps/gps_view.js';
import AccGyroView from './components/accgyro/accgyro_view.js';
import BatteryView from './components/battery/battery_view.js';

class App extends Component {

  render() {
    return (
      <div className="root">
        <div className="row">
          <div className="fifth container_item container_top">
            <GpsView />
          </div>
          <div className="fifth container_item container_top">
            <GpsView />
          </div>
          <div className="fifth container_item container_top">
            <GpsView />
          </div>
          <div className="fifth container_item container_top">
            <GpsView />
          </div>
        </div>
        <div className="row">
          <div className="quarter container_item">
            <AccGyroView />
          </div>
          <div className="quarter container_item">
            <AccGyroView />
          </div>
          <div className="quarter container_item">
            <AccGyroView />
          </div>
          <div className="quarter container_item">
            <AccGyroView />
          </div>
        </div>
        <div className="row">
          <div className="container_item container_bottom">
            <BatteryView />
          </div>
          <div className="container_item container_top">
            <GpsView />
          </div>
          <div className="container_item container_top">
            <GpsView />
          </div>
        </div>
      </div>
    );
  }
}
export default App