import React, { useContext } from "react";
import { WeatherContext } from "../../Context";
import Button from "../Button/Button";
import Icons from "../Icons/Icons";
import Spinner from "../Spinner/Spinner";
import Text from "../Text/Text";
import WeatherService from "../api/WeatherService";
import './WeatherCard.css';

const WeatherCard = () => {
  const { city, weatherData, tempUnit, changeTempUnit, loading } = useContext(WeatherContext);

  if (loading) {
    return (
      <div className="weather-card loading">
        <Spinner size="large" />
        <Text className="loading-text">Loading weather data...</Text>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="weather-card empty">
        <Text>Enter a city to see the weather forecast</Text>
      </div>
    );
  }

  const { current, daily } = weatherData;
  const weatherInfo = WeatherService.getWeatherInfo(current.weatherCode);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getCurrentDay = () => {
    return new Date().toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getWeatherCardClass = (weatherIcon) => {
    if (['clear', 'mainly-clear'].includes(weatherIcon)) return 'sunny';
    if (['partly-cloudy', 'cloudy'].includes(weatherIcon)) return 'cloudy';
    if (['light-rain', 'rain', 'heavy-rain'].includes(weatherIcon)) return 'rainy';
    if (['light-snow', 'snow', 'heavy-snow'].includes(weatherIcon)) return 'snowy';
    if (['thunderstorm'].includes(weatherIcon)) return 'thunder';
    return '';
  };

  const renderCurrentWeather = () => (
    <div className="current-weather">
      <div className="city-info">
        <div className="city-with-icon">
          <Text variant="title">{city}</Text>
          <Icons type={weatherInfo.icon} size="large" />
        </div>
        <Text variant="subtitle">{weatherInfo.description}</Text>
      </div>
      
      <div className="current-details">
        <div className="temperature-section">
          <div className="temperature-display">
            <Text variant="temperature" className="bold-temp">{Math.round(current.temperature)}°</Text>
            <div className="unit-toggle">
              <Button 
                onClick={() => changeTempUnit('celsius')} 
                className={tempUnit === 'celsius' ? 'active' : ''}
              >
                °C
              </Button>
              <span className="unit-divider">|</span>
              <Button 
                onClick={() => changeTempUnit('fahrenheit')} 
                className={tempUnit === 'fahrenheit' ? 'active' : ''}
              >
                °F
              </Button>
            </div>
          </div>
          <Text className="current-day">{getCurrentDay()}</Text>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <Text>Precipitation:</Text>
            <Icons type="precipitation" size="small" />
            <Text>{current.precipitation} mm</Text>
          </div>
          <div className="detail-item">
            <Text>Humidity:</Text>
            <Icons type="humidity" size="small" />
            <Text>{current.humidity}%</Text>
          </div>
          <div className="detail-item">
            <Text>Wind speed:</Text>
            <Icons type="wind" size="small" />
            <Text>{current.windSpeed} km/h</Text>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWeeklyForecast = () => (
    <div className="weekly-forecast">
      <Text className="forecast-title">5-Day Forecast</Text>
      <div className="forecast-cards">
        {daily.map((day, index) => {
          const dayWeatherInfo = WeatherService.getWeatherInfo(day.weatherCode);
          const cardClass = getWeatherCardClass(dayWeatherInfo.icon);
          
          return (
            <div className={`forecast-day-card ${cardClass}`} key={index}>
              <Text className="forecast-day">{formatDate(day.date)}</Text>
              <Icons type={dayWeatherInfo.icon} size="large" />
              <div className="day-temperatures">
                <Text className="forecast-temp">{Math.round(day.temperatureMax)}°</Text>
                <div className="forecast-feels-like">
                  <Text className="forecast-feels-like-label">Feels like</Text>
                  <Text className="forecast-feels-like-temp">{Math.round(day.apparentTemperatureMax)}°</Text>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="weather-card">
      {renderCurrentWeather()}
      {renderWeeklyForecast()}
    </div>
  );
};

export default WeatherCard;