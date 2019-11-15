import React from 'react'
import axios from "axios";

class BatteryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          batteryList: [],
        };
      }
      
      // The componentDidMount() method runs after the component output has been rendered to the DOM.
      componentDidMount() {
        this.refreshList();

        // set auto refresh to 2000 ms
        setInterval(this.refreshList, 2000);
      }
    
      // This function refreshes the list of battery items
      refreshList = () => {
        axios
          .get("http://localhost:8000/api/battery/")
          .then(res => this.setState({ batteryList: res.data }))
          .catch(err => console.log(err));
      };

      // Gets the latest
      getLatest(list){

        if(list.length === 0){
            return -1;
        }
        
        var index = 0;
        var i = 0;
        var earliest = list[0];

        for (const item of list.entries()){
            if(item.time < earliest.time){
                index = i;
                earliest = item
            }
            i++;
        }
        return earliest;
      };
    
      // This function returns the div that we want to render
      renderItems = () => {

        //const newItems = this.state.batteryList;
        const latestGPS = this.getLatest(this.state.batteryList);
        
        if(latestGPS == -1){
            return <div><span>no gps data</span></div>;
        }
        else{           
            return <div>
              <table>
                <tr>
                  <td>Voltage: {latestGPS.voltage}</td>
                </tr>
                <tr>
                  <td>Amperage: {latestGPS.amperage}</td>
                </tr>
                <tr>
                  <td>Datetime: {latestGPS.date} {latestGPS.time}</td>
                </tr>
              </table>
            </div>
        }
      };
    
      handleSubmit = item => {
        this.toggle();
        if (item.id) {
          axios
            .put(`http://localhost:8000/api/battery/${item.id}/`, item)
            .then(res => this.refreshList());
          return;
        }
        axios
          .post("http://localhost:8000/api/battery/", item)
          .then(res => this.refreshList());
      };
    
      render() {
        return (
            <div>
                {this.renderItems()}
            </div>
        );
      }
    }

export default BatteryView