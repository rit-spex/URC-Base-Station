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

        setInterval(this.refreshBattery, 2000);
    }

    refreshBattery = () => {
        var canvas = document.getElementById("canvas");

        if (canvas) {
            var ctx = canvas.getContext("2d");
            var percent = 0;
            
            const latestBattery = this.getLatest(this.state.batteryList);

            if ( latestBattery === -1){
                console.log("No Battery Data")
                percent = 0;
            }
            else{
                if(latestBattery.voltage > 16.8){
                    percent = 100;
                }
                else if(latestBattery.voltage > 16.52){
                    percent = 90;
                }
                else if(latestBattery.voltage > 16.24){
                    percent = 80;
                }
                else if(latestBattery.voltage > 15.96){
                    percent = 70;
                }
                else if(latestBattery.voltage > 15.68){
                    percent = 60;
                }
                else if(latestBattery.voltage > 15.4){
                    percent = 50;
                }
                else if(latestBattery.voltage > 15.12){
                    percent = 40;
                }
                else if(latestBattery.voltage > 14.84){
                    percent = 30;
                }
                else if(latestBattery.voltage > 14.56){
                    percent = 20;
                }
                else if(latestBattery.voltage > 15.12){
                    percent = 10;
                }
                else{
                    percent = 0;
                }
            }
            console.log("Voltage " + latestBattery.voltage)
            ctx.fillStyle = "#00FF00";
            ctx.fillRect(0,0,150*percent,75);
        }
    }

    // This function refreshes the list of battery items
    refreshList = () => {
    axios
        .get("http://localhost:8000/api/battery/")
        .then(res => this.setState({ batteryList: res.data }))
        .catch(err => console.log(err));
    };

    buildBattery(per){
        return <div>
                <canvas id="canvas" width={100} height={40} />
            </div>
    }
    
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

        const latestBattery = this.getLatest(this.state.batteryList);
        
        if(latestBattery === -1){
            return <span>no battery data</span>;
        }
        else{     
            const bat = this.buildBattery(50);      
            return <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Voltage: {latestBattery.voltage} </td>
                            <td> Amperage: {latestBattery.amperage} </td>
                            <td>
                                {bat}
                            </td>
                        </tr>
                    </tbody>
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