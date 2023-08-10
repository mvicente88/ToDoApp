# Task Manager 

Task Manager is an API that allows users to make tasks, view task details, update tasks and delete tasks. The API is built using Express, MongoDB, and Mongoose.

### Prerequisites

* Node.js
* MongoDB
* Express

### Installation

1. Clone the repository
```
git clone https://github.com/mvicente88/ToDoApp-Backend.git
```
2. Install the dependencies
```
npm install
```
3. Connect to the database
```
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
```
4. Run the server
```
node index.js
```

### Usage

#### Get Tasks

Get all tasks:
```
GET /tasks
```

Get a task by ID:
```
GET /tasks/:taskId
```

#### Create Tasks
Create a new task:
```
POST /tasks
```

#### Update Tasks
Update a task by ID:
```
PUT /tasks/:taskId
```

#### Delete Tasks
Delete a task by ID:
```
DELETE /tasks/:taskId
```