import React from 'react'
import axios from "axios";

class GpsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          gpsList: []
        };
      }
      
      componentDidMount() {
        this.refreshList();

        // set auto refresh to 2000 ms
        setInterval(this.refreshList, 2000);
      }
    
      refreshList = () => {
        axios
          .get("http://localhost:8000/api/gps/")
          .then(res => this.setState({ gpsList: res.data }))
          .catch(err => console.log(err));
      };
    
      renderItems = () => {
        const newItems = this.state.gpsList;
        
        if(newItems.length === 0){
            return <span>nodata</span>;
        }
        else{
            const item = newItems[newItems.length - 1];
            
            return <div>
              <table>
                <tr>
                  <td>Longitude: {item.longitude}</td>
                </tr>
                <tr>
                  <td>Latitude: {item.latitude}</td>
                </tr>
                <tr>
                  <td>Altitude: {item.altitude}</td>
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
            .put(`http://localhost:8000/api/gps/${item.id}/`, item)
            .then(res => this.refreshList());
          return;
        }
        axios
          .post("http://localhost:8000/api/gps/", item)
          .then(res => this.refreshList());
      };
    
      handleDelete = item => {
        axios
          .delete(`http://localhost:8000/api/gps/${item.id}`)
          .then(res => this.refreshList());
      };
    
      createItem = () => {
        const item = { title: "", description: "", completed: false };
        this.setState({ activeItem: item, modal: !this.state.modal });
      };
    
      editItem = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
      };
    
      render() {
        return (
            <div>
                {this.renderItems()}
            </div>
        );
      }
    }

export default GpsView