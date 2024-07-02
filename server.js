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

app.get("/api/hello", async (req, res) => {
  const { visitor_name: name } = req.query;

  if (!name) {
    return res.status(400).json({
      message:
        "😕 Oops! It seems you forgot to enter a name. Please provide a name in the query parameter, like /api/hello?visitor_name=YourName.",
      status: 400,
    });
  }

  // Get the client's IP address from the headers or connection info
  const clientIp = normalizeIpAddress(
    req.headers["x-forwarded-for"] || req.connection.remoteAddress
  );

  try {
    // Pass the IP address to getLocation to fetch the location data
    const locationData = await getLocation(clientIp);
    const cityName = locationData.location.region;

    // Fetch weather data based on the city name obtained from the location data
    const weatherData = await getWeather(cityName);

    return res.status(200).json({
      client_ip: clientIp,
      location: cityName,
      greeting: `Hello, ${name}! The temperature is ${weatherData.main.temp} degrees Celsius in ${cityName}.`,
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
