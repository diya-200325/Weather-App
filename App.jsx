import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "f77572d7f19578d3925e9f81fe773f2c"; // your key

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        alert("City not found!");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  // function to convert UNIX timestamp + timezone offset into readable time
  const formatTime = (timezone) => {
    const localTime = new Date(Date.now() + timezone * 1000);
    return localTime.toUTCString().slice(17, 22); // hh:mm format
  };

  return (
    <div className="app">
      <h1 className="title">🌤 Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p className="time">🕒 Local Time: {formatTime(weather.timezone)}</p>
          <p className="temp">{weather.main.temp}°C</p>
          <p className="condition">{weather.weather[0].description}</p>
          <div className="extra">
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>💨 Wind: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
