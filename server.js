const http = require("http");
const fs = require("fs");

var controller = function (req, res) {
  var reqUrl = req.url; // requested url
  switch (reqUrl) {
    //sending text back in json
    case "/":
      res.setHeader("Content-Type", "text/plain");
      res.writeHead(200);
      res.end("HELLO WORLD");
      break;

    //sending back json in response
    case "/json":
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(
        JSON.stringify({
          msg: "hello world",
          "status-code": "200",
        })
      );
      break;

    //sending response in html
    case "/html":
      res.writeHeader(200, { "Content-Type": "text/html" });
      var fspipe = fs.createReadStream(__dirname + "/index.html", "utf-8");
      fspipe.pipe(res);
      break;

    //defaulting everything to 404 not found
    default:
      res.setHeader("Content-Type", "text/html");
      res.writeHead(404);
      res.end("404! not found");
      break;
  }
};

const server = http.createServer(controller);

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening to 127.0.0.1:3000");
});
