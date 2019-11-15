import React from 'react'
import axios from "axios";

class BatteryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          batteryList: []
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
    
      renderItems = () => {
        const newItems = this.state.batteryList;
        
        if(newItems.length === 0){
            return <span>nodata</span>;
        }
        else{
            const item = newItems[newItems.length - 1];
            
            return <div>
              <table>
                <tr>
                  <td>Voltage: {item.voltage}</td>
                </tr>
                <tr>
                  <td>Amperage: {item.amperage}</td>
                </tr>
                <tr>
                  <td>Datetime: {item.date} {item.time}</td>
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