const express = require("express");
const connect = require("./configs/connect");
const scheduleController = require("./controller/schedule.controller");
const app = express();
app.use(express.json());
app.use("/schedule", scheduleController);

const start = () => {
  app.listen(1234, async () => {
    await connect();
    console.log(`server is live on port:1234`);
  });
};
module.exports = start;
