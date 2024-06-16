const express = require("express");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/:name?", (req, res) => {
  const name = req.params.name;
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (!name) {
    res.status(400).json({
      message: "😕 Please enter a name",
      status: 400,
    });
  } else {
    res.status(200).json({
      message: `👋 Hello, ${name}! 🌍`,
      ipAddress: clientIp,
      status: 200,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
