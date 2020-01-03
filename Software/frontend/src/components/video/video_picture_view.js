import React from 'react'
import axios from "axios";

class VideoPictureView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoList: [],
        };
    }
      
    // The componentDidMount() method runs after the component output has been rendered to the DOM.
    componentDidMount() {
    this.refreshList();

    // set auto refresh to 2000 ms
    setInterval(this.refreshList, 2000);
    }

    // This function refreshes the list of video items
    refreshList = () => {
    axios
        .get("http://localhost:8000/api/video/")
        .then(res => this.setState({ videoList: res.data }))
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

        const latestVideo = this.getLatest(this.state.videoList);
        
        if(latestVideo === -1){
            return <span>no video data</span>;
        }
        else{           
            return <div>
                <table>
                    <tr>
                        <td>Voltage: {latestVideo.voltage}</td>
                    </tr>
                    <tr>
                        <td>Amperage: {latestVideo.amperage}</td>
                    </tr>
                </table>
                <span>Last Recieved: {latestVideo.date} {latestVideo.time}</span>
                </div>
        }
    };
    
    handleSubmit = item => {
        this.toggle();
        if (item.id) {
            axios
            .put(`http://localhost:8000/api/video/${item.id}/`, item)
            .then(res => this.refreshList());
            return;
        }
        axios
            .post("http://localhost:8000/api/video/", item)
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

export default VideoPictureView