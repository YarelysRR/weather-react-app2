import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  const [city, setCity] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);

  function handleSearch(event) {
    event.preventDefault();
    const apiKey = "8d3b4eb3bfd4da849a5a61c1e36fe700";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    axios.get(apiUrl).then(showWeather);
  }

  function showWeather(response) {
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(Math.round(response.data.wind.speed));
    setIcon(
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function getPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(GetCurrentLocation);
  }

  function GetCurrentLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = "8d3b4eb3bfd4da849a5a61c1e36fe700";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(showWeather);
  }

  return (
    <div className="WeatherForm">
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Type a city"
          onChange={updateCity}
          className="Input-Box"
        />
        <input type="submit" value="Search" className="Input-Search" />
        <input
          type="submit"
          value="Location"
          className="Input-Location"
          onClick={getPosition}
        />
      </form>
      <h2>{city}</h2>
      <div id="icon">
        <img src={icon} alt={description} />
      </div>
      <ul className="weather_Details">
        <li> Temperature: {temperature}°F</li>
        <li> Description: {description}</li>
        <li> Humidity: {humidity}%</li>
        <li> Wind: {wind} mph</li>
      </ul>
    </div>
  );
}
