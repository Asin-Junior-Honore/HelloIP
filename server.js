const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to normalize IPv6 address if necessary
function normalizeIpAddress(ip) {
  if (ip.startsWith("::ffff:")) {
    return ip.slice(7); // Remove ::ffff: prefix
  }
  if (ip === "::1") {
    return "127.0.0.1"; // Normalize IPv6 loopback to IPv4 loopback
  }
  return ip;
}

app.get("/:name?", (req, res) => {
  const { name } = req.params;
  const clientIp = normalizeIpAddress(
    req.headers["x-forwarded-for"] || req.connection.remoteAddress
  );

  if (!name) {
    return res.status(400).json({
      message:
        "😕 Oops! It seems you forgot to enter a name. Please provide a name in the URL, like /YourName.",
      status: 400,
    });
  }

  return res.status(200).json({
    message: `👋 Hello, ${name}! 🌍`,
    ipAddress: clientIp,
    status: 200,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Endpoint for testing: http://localhost:3000/honore
