import React, {useState, useRef, useEffect } from 'react';
import './Weather.css';
import search_icon from '../src/Assets/search.png';
import clear_icon from '../src/Assets/clear.png';
import cloud_icon from '../src/Assets/cloud.png';
import drizzle_icon from '../src/Assets/drizzle.png';
import humidity_icon from '../src/Assets/humidity.png';
import rain_icon from '../src/Assets/rain.png';
import snow_icon from '../src/Assets/snow.png';
import wind_icon from '../src/Assets/wind.png';
import sun_icon from '../src/Assets/sun.png';
import moon_icon from '../src/Assets/moon.png';

localStorage.clear();

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    humidity: null,
    windSpeed: null,
    location: '',
    icon: clear_icon, // Default icon
  });

  const [isDarkMode, setIsDarkMode] = useState(false); 

  const allIcons = {
    "01d" : clear_icon,
    "01n" : clear_icon,
    "02d" : cloud_icon,
    "02n" : cloud_icon,
    "03d" : cloud_icon,
    "03n" : cloud_icon,
    "04d" : drizzle_icon,
    "04n" : drizzle_icon,
    "09d" : rain_icon,
    "09n" : rain_icon,
    "10d" : rain_icon,
    "10n" : rain_icon,
    "13d" : snow_icon,
    "13n" : snow_icon,
  };

  const search = async (city) => {
    if(city === "") {
      alert("Enter City Name");
      return ;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
    } catch(error) {
      alert('Failed to fetch weather data');
      console.error('Error in fetching weather data:', error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`weather ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="toggle-button" onClick={toggleDarkMode}>
        <img src={isDarkMode ? sun_icon : moon_icon} alt="Toggle Dark Mode" />
      </div>

      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search"></input>
        <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
      </div>
      
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} m/s</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Weather;
