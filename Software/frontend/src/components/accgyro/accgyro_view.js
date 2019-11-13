import React from 'react'
import axios from "axios";

class AccGyroView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          viewCompleted: false,
          activeItem: {
            title: "",
            description: "",
            completed: false
          },
          accGyroList: []
        };
      }
      
      componentDidMount() {
        this.refreshList();

        // set auto refresh to 2000 ms
        setInterval(this.refreshList, 2000);
      }
    
      refreshList = () => {
        axios
          .get("http://localhost:8000/api/accgyro/")
          .then(res => this.setState({ accGyroList: res.data }))
          .catch(err => console.log(err));
      };
    
      renderItems = () => {
        const newItems = this.state.accGyroList;
        
        if(newItems.length === 0){
            return <span>nodata</span>;
        }
        else{
            const item = newItems[newItems.length - 1];
            
            return <div>
              <table>
                <tr>
                  <td>AccX: {item.accX}</td>
                  <td>AccY: {item.accY}</td>
                  <td>AccZ: {item.accZ}</td>
                </tr>
                <tr>
                  <td>GyroX: {item.gyroX}</td>
                  <td>GyroY: {item.gyroY}</td>
                  <td>GyroZ: {item.gyroZ}</td>
                </tr>
              </table>
              <span>Last Recieved: {item.date} {item.time}</span>
            </div>
        }
      };
    
      toggle = () => {
        this.setState({ modal: !this.state.modal });
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
    
      handleDelete = item => {
        axios
          .delete(`http://localhost:8000/api/accgyro/${item.id}`)
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

export default AccGyroView