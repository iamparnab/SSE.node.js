const fs = require("fs");
const path = require("path");

const { ChannelFactNews } = require("../data");
const { getMimeType } = require("../utils");

function serveFile(filePath, res) {
  function readFile(path, cb) {
    let data = "";
    const readStream = fs.createReadStream(path);
    readStream.on("data", (chunk) => {
      data += chunk;
    });
    readStream.on("end", () => cb(data));
    readStream.on("error", () => {
      cb("Can't serve file");
    });
  }
  readFile(path.join(__dirname, "../public", filePath), (data) => {
    res.setHeader("Content-Type", getMimeType(filePath));
    res.write(data);
    res.end();
  });
}

function sseHandler(res) {
  const mySubscription = ChannelFactNews();
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
  });

  const timer = setInterval(() => {
    const nextValue = mySubscription.next();
    res.write(
      `data: {"done":${nextValue.done}, "value": "${nextValue.value}"}\n\n`
    );
    if (nextValue.done) {
      clearInterval(timer);
      res.end();
    }
  }, 1000);
}

module.exports = { serveFile, sseHandler };
