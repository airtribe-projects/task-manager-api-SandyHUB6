const express = require("express");
const app = express();
const port = 3000;

const data = require("./task.json");
const tasks = data.tasks;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});


const isTaskValid = (task) => {
  return (
    typeof task.title === "string" &&
    typeof task.description === "string" &&
    typeof task.completed === "boolean"
  );
};

app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json(task);
});

app.post("/tasks", (req, res) => {
  if (!isTaskValid(req.body)) {
    return res.status(400).json({
      message: "Invalid task data",
    });
  }

  const newTask = {
    id: Math.max(...tasks.map((t) => t.id)) + 1,
    ...req.body,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
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

app.delete("/tasks/:id", (req, res) => {
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



module.exports = app;
