const express = require("express");
const dotenv = require("dotenv");
const { getLocation, getWeather } = require("./api");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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
    const locationData = await getLocation();
    const cityName = locationData.location.region
    const clientIp = locationData.ip;

    const weatherData = await getWeather(cityName);

    return res.status(200).json({
      greeting: `👋 Hello, ${name}! 🌍`,
      client_ip: clientIp,
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
