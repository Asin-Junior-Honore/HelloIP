const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

async function getWeather(cityName) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        cityName
      )}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather: ${error}`);
    throw new Error("Error fetching weather data");
  }
}

module.exports = { getWeather };
