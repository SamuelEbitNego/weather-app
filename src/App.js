import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '56fa1bf40876827aea1b9988e2aab3ac'; // Ganti dengan API key Anda

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  const fetchWeather = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'56fa1bf40876827aea1b9988e2aab3ac'}&units=metric`);
      if (!response.ok) {
        throw new Error('Kota tidak ditemukan');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="App">
      <div className="weather-container">
        <h1>Cuaca Dunia</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Masukkan nama kota"
            required
          />
          <button type="submit">Cari</button>
        </form>
        {error && <p className="error">{error}</p>}
        {loading && <p>Memuat data cuaca...</p>}
        {weather && (
          <div className="weather-card">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <div className="weather-info">
              <img src={getWeatherIcon(weather.weather[0].icon)} alt={weather.weather[0].description} />
              <p className="temperature">{Math.round(weather.main.temp)}°C</p>
            </div>
            <p className="description">{weather.weather[0].description}</p>
            <div className="weather-details">
              <p>Terasa seperti: {Math.round(weather.main.feels_like)}°C</p>
              <p>Kelembaban: {weather.main.humidity}%</p>
              <p>Kecepatan angin: {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;