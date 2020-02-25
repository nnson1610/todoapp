## How to run

1. todo-backend:

```bash
mvn spring-boot:run
```

Start at <http://localhost:8080>. 

Ex api: http://localhost:8080/api/todos


2. todo-frontend:

```bash
npm i
npm start
```

Start at <http://localhost:4200>.


## Create Sample ToDo application.

1.	Every todo item should have the following details.
a.	Todo title
b.	Description about the item
c.	Time of the event

2.	The below are the functions which should be done
a.	Allow functionality to add new todo.
b.	Show list of all Todos.
c.	Update a Todo item.
d.	Delete a Todo item. 
e.	Delete multiple Todo item.

3.	Use the below technologies
a.	Angular 5 or above & Java 8
b.	Validate the fields, all three fields are mandatory, Time of the event should always be greater than the current time.
c.	Angular app should consume the services from spring boot.
d.	Product the REST services using SpringBoot. 
e.	Use MySQL or Mongodb along with spring data to persist the data.
f.	Pretty much appreciated if any in-memory database is used.
