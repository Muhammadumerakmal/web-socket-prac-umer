# 🌐 WebSocket Mastery Guide

A hands-on reference for moving from static HTTP requests to real-time, bidirectional communication.

## 1. The Architectural Shift

WebSockets operate differently than the standard Web model. Instead of a "Request-Response" cycle, we establish a "Persistent Pipe."

### Comparison Table

| Feature       | HTTP (REST)                 | WebSockets                 |
| ------------- | --------------------------- | -------------------------- |
| Protocol      | http:// / https://          | ws:// / wss://             |
| Connection    | Short-lived                 | Long-lived                 |
| Communication | Client-driven (Half-duplex) | Both-driven (Full-duplex)  |
| Payload       | Large (Headers included)    | Small (Binary/Text frames) |

## 2. The Lifecycle

The connection follows a specific path to ensure security and compatibility.

- **The Handshake:** Starts as an HTTP request with an Upgrade header.
- **The Switch:** Server responds with 101 Switching Protocols.
- **The Stream:** The TCP connection remains open for binary or text data.
- **The Heartbeat:** Periodic "Pings" to ensure the connection hasn't died.

## 3. Client-Side (The Frontend)

No libraries are required for basic usage. The browser provides a native WebSocket object.

````javascript
// Establish connection
const socket = new WebSocket('ws://localhost:8080');

// Connection Events
socket.onopen = (e) => {
  console.log("Connected!");
  socket.send(JSON.stringify({ type: 'greet', message: 'Hello Server!' }));
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("New message:", data);
};

socket.onclose = (event) => {
  if (event.wasClean) {
    console.log(`Closed cleanly, code=${event.code}`);
  } else {
    console.log('Connection died');
  }
};

socket.onerror = (error) => {
  console.error(`[error] ${error.message}`);
};
default;
document.body.appendChild(document.createTextNode('WebSocket client initialized'));``` \
the above code demonstrates how to connect and handle events in a WebSocket client.

## 4. Server-Side (Node.js Example)
Using the popular `ws` package for a lightweight, fast implementation.
### Installation
```bash
npm install ws
````

# WebSocket Server Setup in JavaScript

The server code below demonstrates how to set up a simple WebSocket server:

## Content of `server.js`

This code does the following:

- Defines a WebSocket server on port 8080
- Echoes received messages
- Broadcasts messages to all connected clients

## Details:

- The server logs connections and disconnections.
- Handles incoming messages by broadcasting them.

## Code:

```javascript
const WebSocket = require("ws");
// This creates a new WebSocket server instance listening on port 8080.
const wss = new WebSocket.Server({ port: 8080 });

// Define event handlers for connection, message, and close events.
wss.on("connection", function connection(ws) {
  console.log("A new client connected");

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    // To broadcast messages, iterate over all clients and send if open.
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  wss.on("close", () => {
    console.log("A client disconnected");
  });
});
```
