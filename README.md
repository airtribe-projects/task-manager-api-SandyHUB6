# Task Manager API

## Overview

Task Manager API is a RESTful API built using Node.js and Express.js. It allows users to create, retrieve, update, and delete tasks using in-memory storage.

## Features

* Create tasks
* Retrieve all tasks
* Retrieve a task by ID
* Update tasks
* Delete tasks
* Input validation
* Error handling

## Technologies Used

* Node.js
* Express.js
* Tap
* Supertest

## Setup Instructions

### Install Dependencies

```bash
npm install
```

### Start the Server

```bash
node app.js
```

Server runs on:

```text
http://localhost:3000
```

### Run Tests

```bash
npm test
```

## API Endpoints

### Get All Tasks

```http
GET /tasks
```

### Get Task By ID

```http
GET /tasks/:id
```

Example:

```bash
curl http://localhost:3000/tasks/1
```

### Create Task

```http
POST /tasks
```

Request Body:

```json
{
  "title": "Learn Express",
  "description": "Build REST API",
  "completed": false
}
```

### Update Task

```http
PUT /tasks/:id
```

Request Body:

```json
{
  "title": "Updated Task",
  "description": "Updated Description",
  "completed": true
}
```

### Delete Task

```http
DELETE /tasks/:id
```

## Validation Rules

* title must be a non-empty string
* description must be a non-empty string
* completed must be a boolean value

## Error Handling

### Invalid Input

Returns:

```http
400 Bad Request
```

### Task Not Found

Returns:

```http
404 Not Found
```

## Testing

Run the automated test suite:

```bash
npm test
```

Expected Output:

```text
19/19 Tests Passing
```
