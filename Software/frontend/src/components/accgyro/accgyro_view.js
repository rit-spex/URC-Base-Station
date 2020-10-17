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
    else{
      return list.reverse()[0];
    }
  };

  // This function returns the div that we want to render
  renderItems = () => {
    const latestAccGyro = this.getLatest(this.state.accGyroList);
    
    if(latestAccGyro === -1){
      return <span>no acc gyro data</span>;
    }
    else{
        return <div>
          <h3>AccX: {latestAccGyro.accX}</h3>
          <h3>AccY: {latestAccGyro.accY}</h3>
          <h3>AccZ: {latestAccGyro.accZ}</h3>
          <hr></hr>
          <h3>GyroX: {latestAccGyro.gyroX}</h3>
          <h3>GyroY: {latestAccGyro.gyroY}</h3>
          <h3>GyroZ: {latestAccGyro.gyroZ}</h3>
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