# Creating an API

## Backend
* go to /backend

### Make the Model
* add model in models.py

    `class Todo(models.Model):`
    `  title = models.CharField(max_length=120)`
    `  description = models.TextField()`
    `  completed = models.BooleanField(default=False)`
    `  def _str_(self):`
    `    return self.title`

* Add class in admin.py with list_display and register it with the site
    `from .models import Todo`
    `class TodoAdmin(admin.ModelAdmin):`
    `  list_display = ('title', 'description', 'completed')`
    `admin.site.register(Todo, TodoAdmin) # add this`
* Run the server and check to see if it is in the admin view (localhost:8000/admin)
    `$ python manage.py makemigrations rover_base_station`
    `$ python manage.py migrate rover_base_station`
    `$ python manage.py runserver`

### Make the API
* add serializer in serializers.py (don't forget to inport your model)
    `from .models import Todo`
    `class TodoSerializer(serializers.ModelSerializer):`
    `  class Meta:`
    `    model = Todo`
    `    fields = ('id', 'title', 'description', 'completed')`
* create the view in views.py (don't forget to inport your model and serializer)
    `from .models import Todo`
    `class TodoView(viewsets.ModelViewSet):`
    `  serializer_class = TodoSerializer`
    `  queryset = Todo.objects.all()`
* register the view wth the router
    `router.register(r'todos', views.TodoView, 'todo')     # add this`
* Run the server and check to see if the api is present(localhost:8000/api...)
    `$ python manage.py makemigrations rover_base_station`
    `$ python manage.py migrate rover_base_station`
    `$ python manage.py runserver`

## Frontend
* go to /frontend
* yarn start (you might need to install yarn, npm or nodejs 10+)

### Make Component to model data
* goto /frontend/src/components
* make a folder for your new component (be consistant and name it the same like the others)
* goto folder
* make a javascript file named apiname_view.js
* Write the file (should be extremely similar to gps_view.js)

import React from 'react'
import axios from "axios";

class GpsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          viewCompleted: false,
          activeItem: {
            title: "",
            description: "",
            completed: false
          },
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
    
      toggle = () => {
        this.setState({ modal: !this.state.modal });
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

See https://scotch.io/tutorials/build-a-to-do-application-using-django-and-react for more
