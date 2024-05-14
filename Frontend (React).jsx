import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/weather/london'); // Change city as per your requirement
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Error fetching weather data');
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}</p>
          <p>Humidity: {weatherData.main.humidity}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
