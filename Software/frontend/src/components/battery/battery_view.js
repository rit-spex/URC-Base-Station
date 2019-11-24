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

        const latestBattery = this.getLatest(this.state.batteryList);
        
        if(latestBattery === -1){
            return <span>no battery data</span>;
        }
        else{           
            return <div>
                <table>
                    <tr>
                        <td>Voltage: {latestBattery.voltage}</td>
                    </tr>
                    <tr>
                        <td>Amperage: {latestBattery.amperage}</td>
                    </tr>
                </table>
                <span>Last Recieved: {latestBattery.date} {latestBattery.time}</span>
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

    // Returns jsx to render the item in react
    render() {
        return (
            <div>
                {this.renderItems()}
            </div>
        );
    }
}

export default BatteryView