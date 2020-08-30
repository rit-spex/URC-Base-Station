import React from 'react'

import GpsView from '../gps/gps_view.js';
import AccGyroView from '../accgyro/accgyro_view.js';
import BatteryView from '../battery/battery_view.js';
import LidarView from '../lidar/lidar_view.js';
import VideoPictureView from '../video/video_picture_view.js';

class RoverHomepageView extends React.Component {

  // constructor
  constructor(props) {
    super(props);
  }

  // This function returns the div that we want to render
  renderItems = () => {
    return (
      <div className="rover_homepage_view">
    
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
            </div>
            <div className="fifth">
            <div className="container_item container_exclusive">
                <AccGyroView />
            </div>
            <div className="container_item container_exclusive">
                <BatteryView />
            </div>
            <div className="container_item container_exclusive">
                <LidarView />
            </div>
            </div>  
          </div>
        </div>
    )
  };

  // Returns jsx to render the item in react
  render() {
    return (
      <div>
        {this.renderItems()}
      </div>
    );
  }
}

export default RoverHomepageView