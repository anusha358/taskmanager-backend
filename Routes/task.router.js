// const path = require("path");
const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/task.controller");

// router.get("/", tasksController.getTasks);
router.get("/", tasksController.getTasks);
router.post("/addtask", tasksController.postaddTask);
const cb = () => {
  console.log("deleted");
};
router.delete("/deleteTask", tasksController.deleteTask);

// router.get("/", tasksController.updateTasks);

module.exports = router;
