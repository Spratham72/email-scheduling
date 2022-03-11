const express = require("express");
const port=process.env.PORT || 1234;
const connect = require("./configs/connect");
const scheduleController = require("./controller/schedule.controller");
const app = express();
app.use(express.json());
app.use("/schedule", scheduleController);

const start = () => {
  app.listen(port, async () => {
    await connect();
    console.log(`server is live on port:${port}`);
  });
};
module.exports = start;
