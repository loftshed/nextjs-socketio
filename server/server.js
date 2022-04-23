"use strict";

require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const helmet = require("helmet");
const morgan = require("morgan");
const dayjs = require("dayjs");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(express());
const { Configuration, OpenAIApi } = require("openai");
const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));
app.use(helmet());

// --------------------------------------------------
// OpenAI API
// --------------------------------------------------
const { OPENAI_API_KEY } = process.env;
const configuration = new Configuration({
  organization: "org-2lVn6nnydYbQlsysIryU0TgK",
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const queryOpenAI = async (query) => {
  try {
    console.log("User query:", query); // logging the user's query to the bot
    const {
      data: { choices },
    } = await openai.createCompletion("text-davinci-002", {
      prompt: query,
      max_tokens: 1000,
      temperature: 0.9,
    });
    console.log(choices);
    return choices[0].text;
  } catch (err) {
    console.log(err);
  }
};
// --------------------------------------------------
// End of OpenAI API
// --------------------------------------------------

const io = new Server(httpServer, {
  cors: { origin: "*" },
  methods: ["GET", "POST"],
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("postMessage", async ({ post }) => {
    try {
      const botResponse = await queryOpenAI(post);
      console.log(botResponse);
      const returnData = {
        id: uuidv4(),
        message: botResponse,
        timestamp: dayjs().format(),
        author: "OpenAI",
        recd: true,
      };
      io.emit("newMessage", returnData);
    } catch (error) {}
  });
});

httpServer.listen(8000);

// app.get("*", (req, res) => {
//   res.status(404).json({
//     status: 404,
//     message:
//       "404: PEBCAK error occurred during development. Please contact support.",
//   });
// });

// app.listen(8000, () => console.log(`Listening on port 8000`));
