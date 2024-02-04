# Task Manager Backend

## Overview

The Task Manager Backend is a robust, TypeScript-based system designed to manage tasks efficiently and securely. Leveraging Express.js and MongoDB, it offers comprehensive functionalities for task operations, including creating, retrieving, updating, and deleting tasks, along with a special feature for toggling a task's completion status.

## Features

### Task Management

- **Create Task**: Add new tasks to the system.
- **Get Tasks**: Retrieve a list of all tasks.
- **Get Task by ID**: Fetch a single task by its unique identifier.
- **Update Task**: Modify details of an existing task.
- **Toggle Task Completion**: Specifically designed route to toggle the completion status (`isDone`) of a task.
- **Delete Task**: Remove a task from the system.


### Environment Variables

Create a `.env` file in the root directory with the following variables:

- `PORT`: The port number for the server.
- `MONGODB_URI`: Your MongoDB connection URI.
- `AUTH0_AUDIENCE`: The Auth0 audience for authentication.
- `AUTH0_ISSUER_BASE_URL`: The Auth0 issuer base URL.


## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/kaikrmen/tasks-backend.git
cd tasks-backend-main
npm install
```

### Scripts

- build: Compiles TypeScript and copies Swagger documentation.
- start: Concurrently runs the build script and starts the server with nodemon.
- test: Executes tests with Jest, detecting open handles for proper shutdown.

### Run the project

```bash
npm start
```

### Tests
```bash
npm test
```

### API Documentation

API documentation is provided via Swagger UI, accessible when the server is running. Additionally, the API is documented in Postman for easy testing and interaction with the endpoints.

- To se the docs, go to /api-docs route in your backend when is running

<img src="./assets/Screenshot 2024-02-03 224447.png">

</br>

<img src="./assets/Screenshot 2024-02-03 224524.png">

</br>

<img src="./assets/Screenshot 2024-02-03 224701.png">

</br>

<img src="./assets/Screenshot 2024-02-03 224729.png">
