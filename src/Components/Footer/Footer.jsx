import React, { useContext } from "react";
import { WeatherContext } from "../../Context";
import './Footer.css';

const Footer = () => {
  const { searchHistory } = useContext(WeatherContext);
  
  return (
    <div className="footer">
      <p>Weather data provided by Open-Meteo API</p>
      {searchHistory.length > 0 && (
        <div className="search-history">
          <p>Recent searches:</p>
          <ul>
            {searchHistory.slice(-3).map((item, index) => (
              <li key={index}>{item.city}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Footer;