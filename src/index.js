import meteoconsJSON from '@iconify-json/meteocons/icons.json';
import { addCollection } from '@iconify/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/metecons.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import WeatherApp from './WeatherApp';

addCollection(meteoconsJSON);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>
);

reportWebVitals();
