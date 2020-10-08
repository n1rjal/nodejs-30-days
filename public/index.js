const form = document.getElementById("msgform");
const user = prompt("Enter your name");
//const user = "n1";
const socket = io("http://localhost:3000");
const message = document.getElementsByClassName("messages")[0];

const make = (resObj, own = false) => {
  let msgElement = document.createElement("div");
  msgElement.classList.add("message-container");

  own === true ? msgElement.classList.add("own") : null;

  let msg = document.createElement("p");
  msg.classList.add("message");
  msg.innerText = resObj.msg;

  let user = document.createElement("p");
  user.classList.add("user");
  user.innerText = resObj.user;

  msgElement.appendChild(user);

  msgElement.appendChild(msg);

  message.appendChild(msgElement);
};

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var msg = document.getElementsByName("msg")[0].value;
  console.log(`${user} => ${msg}`);
  socket.on("connect", () => {
    console.log("Connected to socket with id => " + socket.id);
  });
  socket.emit("message", { user, msg });
  message.value = "";
  return false;
});

document
  .getElementsByName("msg")[0]
  .addEventListener("keypress", function (event) {
    socket.emit("typing", true);
  });

socket.on("msg", (value) => {
  document.getElementById("typing").innerText = "";
  value.user === user ? make(value, true) : make(value);
});

socket.on("typing", (value) => {
  document.getElementById("typing").innerText = "Someone is typing";
});
