const http = require("http");

const { serveFile, sseHandler } = require("./handlers");

const server = http.createServer(function (req, res) {
  if (req.url === "/") {
    serveFile("/index.html", res, "text/html");
  } else if (req.url.match(/\.(css|js|html)$/)) {
    serveFile(req.url, res);
  } else if (req.url === "/giveUpdates") {
    sseHandler(res);
  } else {
    res.end();
  }
});

server.listen(8080, "0.0.0.0", () => {
  console.log("Server is running at 8080");
});
