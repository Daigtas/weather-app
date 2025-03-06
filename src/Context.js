import React, { createContext, useEffect, useState } from 'react';
import CityService from './Components/api/CityService';
import WeatherService from './Components/api/WeatherService';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState('');
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [weatherData, setWeatherData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [tempUnit, setTempUnit] = useState('celsius'); // 'celsius' or 'fahrenheit'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch weather data when coordinates change
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (coordinates.latitude && coordinates.longitude) {
        setLoading(true);
        setError(null);
        try {
          const data = await WeatherService.getWeather(
            coordinates.latitude, 
            coordinates.longitude,
            tempUnit
          );
          setWeatherData(data);
          
          // Add to search history if it's a new search
          if (!searchHistory.some(item => item.city === city)) {
            setSearchHistory(prev => [...prev, { 
              city, 
              coordinates,
              timestamp: new Date().toISOString()
            }]);
          }
        } catch (err) {
          setError('Failed to fetch weather data');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWeatherData();
  }, [coordinates, tempUnit, city, searchHistory]);

  // Search city and get coordinates
  const searchCity = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const coords = await CityService.getCityCoordinates(cityName);
      if (coords) {
        setCity(cityName);
        setCoordinates(coords);
      } else {
        setError('City not found');
      }
    } catch (err) {
      setError('Failed to search city');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Convert temperature between units
  const convertTemperature = (temp, targetUnit) => {
    if (targetUnit === 'celsius' && tempUnit === 'fahrenheit') {
      return (temp - 32) * 5/9;
    } else if (targetUnit === 'fahrenheit' && tempUnit === 'celsius') {
      return (temp * 9/5) + 32;
    }
    return temp;
  };

  // Change temperature unit
  const changeTempUnit = (unit) => {
    setTempUnit(unit);
  };

  return (
    <WeatherContext.Provider value={{
      city,
      coordinates,
      weatherData,
      searchHistory,
      tempUnit,
      loading,
      error,
      searchCity,
      convertTemperature,
      changeTempUnit
    }}>
      {children}
    </WeatherContext.Provider>
  );
};
