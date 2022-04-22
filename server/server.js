"use strict";

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(express());

const io = new Server(httpServer, {
  cors: { origin: "*" },
  methods: ["GET", "POST"],
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("postMessage", (data) => {
    console.log(data);
    // io.emit("newMessage", data);
  });
});

httpServer.listen(8000);

// app.use(morgan("tiny"));
// app.use(express.json());
// app.use(express.static("public"));
// app.use(helmet());
// app.use(cors());

// app.get("*", (req, res) => {
//   res.status(404).json({
//     status: 404,
//     message:
//       "404: PEBCAK error occurred during development. Please contact support.",
//   });
// });

// app.listen(8000, () => console.log(`Listening on port 8000`));
