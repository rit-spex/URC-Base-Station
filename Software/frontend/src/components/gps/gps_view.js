import React from 'react'
import axios from "axios";

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

    /*

    if(list.length === 0){
        return -1;
    }

    var latest = list[0];

    for (const item of list.entries()){
      if(item.date >= latest.date & item.time >= latest.time){
        latest = item
      }

    }
    return latest;
    */
};

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