const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/weatherDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Weather Schema
const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  humidity: Number,
});

const Weather = mongoose.model('Weather', weatherSchema);

// Fetch weather data
app.get('/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = 'YOUR_API_KEY';
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    
    // Save data to MongoDB
    const weatherData = new Weather({
      city: city,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
    });
    await weatherData.save();

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching weather data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
