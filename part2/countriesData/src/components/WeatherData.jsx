import { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherData = ({ capital }) => {
  const OPENWEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [weather, setWeather] = useState([]);
  console.log(capital);
  console.log(OPENWEATHER_API_KEY);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${OPENWEATHER_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  return (
    <>
      {weather.main ? (
        <div>
          <h2>Weather in {capital}</h2>
          <div>Temperature {weather.main.temp}°C</div>
          <img
            alt="weather icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <div>Wind {weather.wind.speed} m/s</div>
        </div>
      ) : null}
    </>
  );
};


export default WeatherData