"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
app.use(cors());

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message:
      "404: PEBCAK error occurred during development. Please contact support.",
  });
});

app.listen(8000, () => console.log(`Listening on port 8000`));
