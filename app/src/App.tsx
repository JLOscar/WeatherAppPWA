import React, {useState} from 'react';
import { fetchWeather } from "./api/fetchWeather"
import "./App.css"

export interface WeatherResponse {
  "coord": {
    "lon": number,
    "lat": number
  },
  "weather": [
    {
      "id": number,
      "main": string,
      "description": string,
      "icon": string
    }
  ],
  "base": string,
  "main": {
    "temp": number,
    "feels_like": number,
    "temp_min": number,
    "temp_max": number,
    "pressure": number,
    "humidity": number
  },
  "visibility": number,
  "wind": {
    "speed": number,
    "deg": number
  },
  "clouds": {
    "all": number
  },
  "dt": number,
  "sys": {
    "type": number,
    "id": number,
    "message": number,
    "country": string,
    "sunrise": number,
    "sunset": number
  },
  "timezone": number,
  "id": number,
  "name": string,
  "cod": number
}

const App = () => {

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<WeatherResponse>();

  const search = async (e: any) => {
    if(e.key === "Enter"){
      const data = await fetchWeather(query)
      
      console.log(data)
      setWeather(data)
      setQuery("")
    }
  }

  return (
    <div className="main-container">
      <input
      type="text"
      className="search"
      placeholder="Search ... "
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyPress={search}
      />
      {weather?.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
