import React from 'react'
import axios from "axios";

class AccGyroView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accGyroList: []
    };
  }
  
  // The componentDidMount() method runs after the component output has been rendered to the DOM.
  componentDidMount() {
    this.refreshList();

    // set auto refresh to 2000 ms
    setInterval(this.refreshList, 2000);
  }

  // This function refreshes the list of Acc Gyro items
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/accgyro/")
      .then(res => this.setState({ accGyroList: res.data }))
      .catch(err => console.log(err));
  };

  // Gets the latest
  getLatest(list){

    if(list.length === 0){
        return -1;
    }

    var earliest = list[0];

    for (const item of list.entries()){
        if(item.time < earliest.time){
            earliest = item
        }
    }
    return earliest;
  };

  // This function returns the div that we want to render
  renderItems = () => {
    const latestAccGyro = this.getLatest(this.state.accGyroList);
    
    if(latestAccGyro === -1){
      return <span>no acc gyro data</span>;
    }
    else{
        return <div>
          <table>
          <tr>
            <td>AccX: {latestAccGyro.accX}</td>
            <td>AccY: {latestAccGyro.accY}</td>
            <td>AccZ: {latestAccGyro.accZ}</td>
          </tr>
          <tr>
            <td>GyroX: {latestAccGyro.gyroX}</td>
            <td>GyroY: {latestAccGyro.gyroY}</td>
            <td>GyroZ: {latestAccGyro.gyroZ}</td>
          </tr>
        </table>
        <span>Last Recieved: {latestAccGyro.date} {latestAccGyro.time}</span>
        </div>
    }
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/accgyro/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/accgyro/", item)
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

export default AccGyroView