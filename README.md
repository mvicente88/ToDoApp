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

Before running the server, make sure to configure your MongoDB connection. You can do this by editing the `.env` file and providing your MongoDB URL:
```
MONGODB_URI=mongodb://your-mongodb-url
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

#### Docker Deployment
To deploy the backend API using Docker, you can use the provided docker-compose.yml file. Make sure you have Docker installed, and then run the following command in your project directory:
```
docker-compose up
```
The API will be accessible at http://localhost:8000.

Note: Before deploying with Docker, update the .env file in the backend service section of the docker-compose.yml with your MongoDB URL.