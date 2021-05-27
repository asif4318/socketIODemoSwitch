const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;

const app = express();
app.get("/", (req, res) => res.send("Landing"));

const server = http.createServer(app);

const io = socketIo(server);

let interval;
let switchStatus = false;

io.on("connection", (socket) => {
  console.log("New client connected");
  getApiAndEmit(socket, true)
  app.get('/toggle', (req,res) => {
    getApiAndEmit(socket, false)
    res.send('Toggled: ' + switchStatus)
  })
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket, isFirstTime) => {
  if (isFirstTime === true) {
    switchStatus = switchStatus
  } else {
    switchStatus = !switchStatus
  }
  // Emitting a new message. Will be consumed by the client
  io.emit("FromAPI", switchStatus);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
