# Creating an API

## Backend
* go to /backend

### Make the Model
* add model in models.py

      class Todo(models.Model):

        title = models.CharField(max_length=120)

        description = models.TextField()

        completed = models.BooleanField(default=False)

        def _str_(self):

          return self.title

* Add class in admin.py with list_display and register it with the site

      from .models import Todo

      class TodoAdmin(admin.ModelAdmin):

        list_display = ('title', 'description', 'completed')

      admin.site.register(Todo, TodoAdmin)

* Run the server and check to see if it is in the admin view (localhost:8000/admin)
      `$ python manage.py makemigrations rover_base_station`
      `$ python manage.py migrate rover_base_station`
      `$ python manage.py runserver`

### Make the API
* add serializer in serializers.py (don't forget to inport your model)
    
      from .models import Todo

          class TodoSerializer(serializers.ModelSerializer):

        class Meta:

          model = Todo

          fields = ('id', 'title', 'description', 'completed')

* create the view in views.py (don't forget to inport your model and serializer)
    
      from .models import Todo`

      class TodoView(viewsets.ModelViewSet):

        serializer_class = TodoSerializer

        queryset = Todo.objects.all()

* register the view wth the router

    `router.register(r'todos', views.TodoView, 'todo')`

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

See https://scotch.io/tutorials/build-a-to-do-application-using-django-and-react for more
