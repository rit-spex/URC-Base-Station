import React from 'react'
import axios from "axios";

class LidarView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lidarList: []
    };
  }
  
  // The componentDidMount() method runs after the component output has been rendered to the DOM.
  componentDidMount() {
    this.refreshList();

    // set auto refresh to 2000 ms
    setInterval(this.refreshList, 2000);
  }

  // This function refreshes the list of Lidar items
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/lidar/")
      .then(res => this.setState({ lidarList: res.data }))
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
    const latestLidar = this.getLatest(this.state.lidarList);

    if(latestLidar === -1){
      return <span>no lidar data</span>;
    }
    else{
        return <div>
          <div className="container_centered">
            <img className="lidarpicture" alt="" src={latestLidar.img} />
          </div>
          <p>Last Recieved: {latestLidar.date} {latestLidar.time}</p>
        </div>
    }
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/lidar/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/lidar/", item)
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

export default LidarView