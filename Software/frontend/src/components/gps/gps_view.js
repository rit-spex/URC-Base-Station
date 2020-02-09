import React from 'react'
import axios from "axios";
//import OpenLayers from "./OpenLayers";

class GpsView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gpsList: []
    }; 
  }
  
  // The componentDidMount() method runs after the component output has been rendered to the DOM.
  componentDidMount() {
    this.refreshList();

    // set auto refresh to 2000 ms
    setInterval(this.refreshList, 2000);
  }

  // This function refreshes the list of GPS items
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/gps/")
      .then(res => this.setState({ gpsList: res.data }))
      .catch(err => console.log(err));
  };

  // Gets the latest
  getLatest(list){

    if(list.length === 0){
      return -1;
    }
    else{
      return list.reverse()[0];
    }
};

/*
buildOpenStreetMap(){
  var lat=-77.6749;
  var lon=43.0845;
  var zoom=15;
  var map;
  map = new OpenLayers.Map ("map", {
  controls:[
      new OpenLayers.Control.Navigation(),
      new OpenLayers.Control.PanZoomBar(),
      new OpenLayers.Control.LayerSwitcher(),
      new OpenLayers.Control.Attribution()],
      maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
      maxResolution: 156543.0399,
      numZoomLevels: 19,
      units: 'm',
      projection: new OpenLayers.Projection("EPSG:900913"),
      displayProjection: new OpenLayers.Projection("EPSG:4326")
  } );


  
  map.addLayer(new OpenLayers.Layer.OSM());

  var lonLat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));

  map.setCenter (lonLat, zoom);

  //Initialise the vector layer using OpenLayers.Format.OSM
  var layer = new OpenLayers.Layer.Vector("Polygon", {
      strategies: [new OpenLayers.Strategy.Fixed()],
      protocol: new OpenLayers.Protocol.HTTP({
          url: "maps/map.osm",   //<-- relative or absolute URL to your .osm file
          format: new OpenLayers.Format.OSM()
      }),
      projection: new OpenLayers.Projection("EPSG:4326")
  });

  map.addLayers([layer]);
  }
  */

  // This function returns the div that we want to render
  renderItems = () => {
    const latestGPS = this.getLatest(this.state.gpsList);
    
    if(latestGPS === -1){
      return <span>no gps data</span>;
    }
    else{
        return <div>
          <table>
            <tr>
              <td>Longitude: {latestGPS.longitude}</td>
            </tr>
            <tr>
              <td>Latitude: {latestGPS.latitude}</td>
            </tr>
            <tr>
              <td>Altitude: {latestGPS.altitude}</td>
            </tr>
          </table>
          <span>Last Recieved: {latestGPS.date} {latestGPS.time}</span>
          </div>
    }
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/gps/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/gps/", item)
      .then(res => this.refreshList());
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

export default GpsView