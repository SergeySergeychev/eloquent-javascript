const { createServer, request } = require("http");

// Server Part
createServer((request, response) => {
  // Response header to client
  response.writeHead(200, { "Content-Type": "text/plain" });
  // Event listener awaits for request from user side and respond with upper case plain text.
  request.on("data", (chunk) => response.write(chunk.toString().toUpperCase()));
  // Data is recieved end the stream.
  request.on("end", () => response.end());
}).listen(8000);

// Client Part
request(
  // Write request to server.
  {
    hostname: "localhost",
    port: 8000,
    method: "POST",
  },
  // Awaits for response and with proces's standard output print output to user terminal.
  (response) => {
    response.on("data", (chunk) => process.stdout.write(chunk));
  }
).end("hello server");
