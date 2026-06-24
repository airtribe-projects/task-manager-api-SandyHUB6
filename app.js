const express = require("express");
const app = express();
const port = 3000;

const tasks = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
  },
  {
    id: 2,
    title: "Create a new project",
    description: "Create a new project using the Express application generator",
    completed: true,
  },
  {
    id: 3,
    title: "Install nodemon",
    description: "Install nodemon as a development dependency",
    completed: true,
  },
  {
    id: 4,
    title: "Install Express",
    description: "Install Express",
    completed: false,
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const isTaskValid = (task) => {
  return (
    typeof task.title === "string" &&
    task.title.trim().length > 0 &&
    typeof task.description === "string" &&
    task.description.trim().length > 0 &&
    typeof task.completed === "boolean"
  );
};

const isTaskIdValid = (id) => {
  const taskId = Number(id);
  return Number.isInteger(taskId) && taskId > 0;
};

// GET all tasks with optional filtering
app.get("/tasks", (req, res) => {
  let result = [...tasks];

  if (req.query.completed !== undefined) {
    const completed = req.query.completed === "true";

    result = result.filter(
      (task) => task.completed === completed
    );
  }

  res.status(200).json(result);
});

// GET task by id
app.get("/tasks/:id", (req, res) => {
  if (!isTaskIdValid(req.params.id)) {
    return res.status(400).json({
      message: "Invalid task id",
    });
  }

  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json(task);
});

// CREATE task
app.post("/tasks", (req, res) => {
  if (!isTaskValid(req.body)) {
    return res.status(400).json({
      message: "Invalid task data",
    });
  }

  const nextId =
    tasks.length > 0
      ? Math.max(...tasks.map((t) => t.id)) + 1
      : 1;

  const newTask = {
    id: nextId,
    ...req.body,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// UPDATE task
app.put("/tasks/:id", (req, res) => {
  if (!isTaskIdValid(req.params.id)) {
    return res.status(400).json({
      message: "Invalid task id",
    });
  }

  const id = Number(req.params.id);

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (!isTaskValid(req.body)) {
    return res.status(400).json({
      message: "Invalid task data",
    });
  }

  tasks[index] = {
    id,
    ...req.body,
  };

  res.status(200).json(tasks[index]);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  if (!isTaskIdValid(req.params.id)) {
    return res.status(400).json({
      message: "Invalid task id",
    });
  }

  const id = Number(req.params.id);

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  tasks.splice(index, 1);

  res.status(200).json({
    message: "Task deleted successfully",
  });
});

if (require.main === module) {
  app.listen(port, (err) => {
    if (err) {
      return console.log("Something bad happened", err);
    }
    console.log(`Server is listening on ${port}`);
  });
}

module.exports = app;