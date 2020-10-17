import React from 'react'

import GpsView from '../gps/gps_view.js';
import AccGyroView from '../accgyro/accgyro_view.js';
import BatteryView from '../battery/battery_view.js';
import LidarView from '../lidar/lidar_view.js';
import VideoPictureView from '../video/video_picture_view.js';

class RoverHomepageView extends React.Component {

  render_data_views(){
    return (
      <div className="dataOverlay">
        <div className="container_item container_exclusive gpsViewData">
          <GpsView />
        </div>
        <div className="videocontainer">
          <div className="container_item container_exclusive videoData">
            <VideoPictureView />
          </div>  
        </div>
        <div className="container_item container_exclusive accGyroViewData">
          <AccGyroView />
        </div>
        <div className="container_item container_exclusive batteryData">
          <BatteryView />
        </div>
        <div className="container_item container_exclusive lidarData">
          <LidarView />
        </div>
      </div>
    );
  }

  // // This function returns the div that we want to render
  // renderItems = () => {
  //   return (
  //     <div className="rover_homepage_view">
  //       <div className="rover_data_views">
  //       {this.render_data_views()}
  //       </div>
  //     </div>
  //   )
  // };

  // Returns jsx to render the item in react
  render() {
    return (
      <div className="rover_homepage_view">
        <div className="rover_data_views">
        {this.render_data_views()}
        </div>
      </div>
    );
  }
}

export default RoverHomepageView