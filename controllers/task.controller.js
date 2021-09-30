const Task = require("../models/task.model");

exports.getTasks = (req, res, next) => {
  Task.fetchAll()
    .then((tasks) => {
      res
        .status(200)
        .json({ message: "Fetched Tasks successfully", tasks: tasks });
    })
    .catch((err) => {
      console.error(err);
      const error = new Error("could not fetch the data");
      error.statusCode = 404;
      throw error;
    });
};

exports.postaddTask = (req, res, next) => {
  // req.body = { userName: "anusha" };

  const task = new Task(
    req.body.userName,
    req.body.selectedDate,
    req.body.taskName,
    req.body.notes,
    req.body.list
  );
  task
    .save()
    .then((result) => {
    })
    .catch((err) => {
      console.error(err);
    });
  res.status(201).json({
    message: "task added successfully",
    task: task,
  });
};

exports.deleteTask = (req, res, next) => {
  const task = new Task(
    req.body.userName,
    req.body.selectedDate,
    req.body.taskName,
    req.body.notes,
    req.body.list
  );
  task.remove().then((result) => {
  });
};
