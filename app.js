const express = require("express");
const sockets = require("socket.io");

app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("chat");
});

const server = app.listen(3000, () => console.log("LISTENING TO PORT 3000"));

io = sockets(server);

io.on("connection", (socket) => {
  console.log("Socket Connection made");

  socket.on("message", (value) => {
    io.emit("msg", value);
  });

  socket.on("typing", (value) => {
    socket.broadcast.emit("typing", true);
  });
});
