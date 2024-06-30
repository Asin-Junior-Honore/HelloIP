const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const IPIFY_API_KEY = process.env.IPIFY_API_KEY;
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

async function getLocation(clientIp) {
  try {
    const response = await axios.get(
      `https://geo.ipify.org/api/v1?apiKey=${IPIFY_API_KEY}&ipAddress=${clientIp}`
    );

    console.log(`IPify API Response: ${JSON.stringify(response.data)}`);

    return response.data;
  } catch (error) {
    console.error(`Error fetching location: ${error}`);
    throw new Error("Error fetching location data");
  }
}

async function getWeather(cityName) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        cityName
      )}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
    );

    console.log(
      `OpenWeatherMap API Response: ${JSON.stringify(response.data)}`
    );

    return response.data;
  } catch (error) {
    console.error(`Error fetching weather: ${error}`);
    throw new Error("Error fetching weather data");
  }
}

module.exports = { getLocation, getWeather };
