// frontend/src/App.js

import React, { Component } from "react";

import GpsView from './components/gps/gps_view.js';
import AccGyroView from './components/accgyro/accgyro_view.js';
import BatteryView from './components/battery/battery_view.js';
import VideoPictureView from './components/video/video_picture_view.js';
import VideoDataView from './components/video/video_data_view.js';

class App extends Component {

  render() {
    return (
      <div className="root">
        
        <div className="row">
          <div className="navbar">
            <p>navbar</p>
          </div>
        </div>

        <div className="row">
          <div className="fifth">
            <div className="container_item container_exclusive">
              <GpsView />
            </div>
          </div>
          <div className="videocontainter">
            <div className="container_item container_exclusive">
              <VideoPictureView />
            </div>
            <div className="container_item container_exclusive">
              <VideoDataView />
            </div>    
          </div>
          <div className="fifth">
            <div className="container_item container_exclusive">
              <AccGyroView />
            </div>
            <div className="container_item container_exclusive">
              <BatteryView />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App