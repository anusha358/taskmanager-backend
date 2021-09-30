const tasks = [];
const getDb = require("../utils/mongodb").getDb;
module.exports = class Task {
  constructor(userName, selectedDate, taskName, notes, list) {
    this.userName = userName;
    this.selectedDate = selectedDate;
    this.taskName = taskName;
    this.notes = notes;
    this.list = list;
  }
  static fetchAll(cb) {
    const db = getDb();
    return db
      .collection("tasks")
      .find({})
      .toArray()
      .then((tasks) => {
        return tasks;
      })
      .catch((err) => {
      });
  }
  save() {
    const db = getDb();
    return db
      .collection("tasks")
      .insertOne(this)
      .then((result) => {
      })
      .catch((err) => {
      });
  }

  remove() {
    const db = getDb();
    return db
      .collection("tasks")
      .deleteOne(this)
      .then((result) => {
      })
      .catch((err) => {
      });
  }
};
