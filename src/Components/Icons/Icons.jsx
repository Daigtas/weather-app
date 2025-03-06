import { Icon } from '@iconify/react';
import React from "react";
import './AnimatedIcons.css';
import './Icons.css';

const Icons = ({ type, size = "medium" }) => {
  const getIconName = () => {
    switch (type) {
      case 'clear':
        return 'meteocons:clear-day-fill';
      case 'mainly-clear':
        return 'meteocons:partly-cloudy-day-fill';
      case 'partly-cloudy':
        return 'meteocons:partly-cloudy-day-fill';
      case 'cloudy':
        return 'meteocons:cloudy-fill';
      case 'fog':
        return 'meteocons:fog-fill';
      case 'light-rain':
        return 'meteocons:drizzle-fill';
      case 'rain':
        return 'meteocons:rain-fill';
      case 'heavy-rain':
        return 'meteocons:rain-fill';
      case 'light-snow':
        return 'meteocons:snow-fill';
      case 'snow':
        return 'meteocons:snow-fill';
      case 'heavy-snow':
        return 'meteocons:snowflake-fill';
      case 'thunderstorm':
        return 'meteocons:thunderstorms-fill';
      case 'humidity':
        return 'meteocons:humidity-fill';
      case 'precipitation':
        return 'meteocons:raindrop-fill';
      case 'wind':
        return 'meteocons:wind-fill';
      default:
        return 'meteocons:not-available-fill';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'clear':
        return 'icon-sunny-filled';
      case 'mainly-clear':
      case 'partly-cloudy':
        return 'icon-partly-cloudy-filled';
      case 'cloudy':
        return 'icon-cloudy-filled';
      case 'fog':
        return 'icon-fog-filled';
      case 'light-rain':
      case 'rain':
      case 'heavy-rain':
        return 'icon-rain-filled';
      case 'light-snow':
      case 'snow':
      case 'heavy-snow':
        return 'icon-snow-filled';
      case 'thunderstorm':
        return 'icon-thunder-filled';
      case 'humidity':
        return 'icon-humidity-filled';
      case 'precipitation':
        return 'icon-precipitation-filled';
      case 'wind':
        return 'icon-wind-filled';
      default:
        return '';
    }
  };
  
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return '24';
      case 'medium':
        return '34';
      case 'large':
        return '100';
      default:
        return '34';
    }
  };

  const getAnimationContainerClass = () => {
    switch (type) {
      case 'clear':
        return 'animated-sun';
      case 'light-rain':
      case 'rain':
      case 'heavy-rain':
        return 'animated-rain';
      case 'light-snow':
      case 'snow':
      case 'heavy-snow':
        return 'animated-snow';
      case 'thunderstorm':
        return 'animated-thunder';
      case 'wind':
        return 'animated-wind';
      case 'fog':
        return 'animated-fog';
      default:
        return '';
    }
  };

  return (
    <div className={`animated-icon-container ${getAnimationContainerClass()}`} style={{ position: 'relative', display: 'inline-block' }}>
      <Icon
        icon={getIconName()}
        width={getSizeClass()}
        height={getSizeClass()}
        className={`${getIconColor()} weather-icon`}
        style={{ display: 'inline-block' }}
      />
    </div>
  );
};

export default Icons;