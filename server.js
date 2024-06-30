const express = require("express");
const dotenv = require("dotenv");
const { getLocation, getWeather } = require("./api");

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

app.get("/:name?", async (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({
      message:
        "😕 Oops! It seems you forgot to enter a name. Please provide a name in the URL, like /YourName.",
      status: 400,
    });
  }

  try {
    const clientIp = normalizeIpAddress(
      req.headers["x-forwarded-for"] || req.connection.remoteAddress
    );

    const locationData = await getLocation(clientIp);

    const cityName = locationData.location.region;
    const clientIpFromApi = locationData.ip;

    const weatherData = await getWeather(cityName);

    return res.status(200).json({
      greeting: `👋 Hello, ${name}! 🌍`,
      client_ip: clientIpFromApi,
      location: cityName,
      temperature: weatherData.main.temp,
      message: `Hello, ${name}! The temperature is ${weatherData.main.temp} degrees Celsius in ${cityName}.`,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "😞 Sorry, we couldn't retrieve your location or weather information.",
      status: 500,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
