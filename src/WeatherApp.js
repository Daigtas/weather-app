import React, { useEffect } from 'react';
import CitySearch from './Components/CitySearch/CitySearch';
import Footer from './Components/Footer/Footer';
import WeatherCard from './Components/WeatherCard/WeatherCard';
import { WeatherProvider } from './Context';
import './Main.css';

import meteoconsJSON from '@iconify-json/meteocons/icons.json';
import { addCollection } from '@iconify/react';

const WeatherApp = () => {
  useEffect(() => {
    try {
      addCollection(meteoconsJSON);
    } catch (e) {
      console.warn('Meteocons already loaded or failed to load', e);
    }
  }, []);

  return (
    <WeatherProvider>
      <div className="app-container">
        <div className="app-content">
          <CitySearch />
          <WeatherCard />
          <Footer />
        </div>
      </div>
    </WeatherProvider>
  );
};

export default WeatherApp;
