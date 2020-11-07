function getMimeType(filePath) {
  if (filePath.endsWith(".css")) {
    return "text/css";
  } else if (filePath.endsWith(".js")) {
    return "application/javascript";
  } else if (filePath.endsWith(".html")) {
    return "text/html";
  }
}

module.exports = { getMimeType };
