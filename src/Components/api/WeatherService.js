class WeatherService {
  static async getWeather(latitude, longitude, unit = 'celsius') {
    try {
      const temperatureUnit = unit === 'celsius' ? 'celsius' : 'fahrenheit';
      const windSpeedUnit = 'kmh';
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&timezone=auto&temperature_unit=${temperatureUnit}&wind_speed_unit=${windSpeedUnit}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        current: {
          temperature: data.current.temperature_2m,
          apparentTemperature: data.current.apparent_temperature,
          humidity: data.current.relative_humidity_2m,
          precipitation: data.current.precipitation,
          weatherCode: data.current.weather_code,
          windSpeed: data.current.wind_speed_10m
        },
        daily: data.daily.time.map((date, index) => ({
          date,
          weatherCode: data.daily.weather_code[index],
          temperatureMax: data.daily.temperature_2m_max[index],
          temperatureMin: data.daily.temperature_2m_min[index],
          apparentTemperatureMax: data.daily.apparent_temperature_max[index],
          apparentTemperatureMin: data.daily.apparent_temperature_min[index],
          precipitationSum: data.daily.precipitation_sum[index]
        })).slice(0, 5)
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  static getWeatherInfo(code) {
    const weatherCodes = {
      0: { description: 'Clear sky', icon: 'clear' },
      1: { description: 'Mainly clear', icon: 'mainly-clear' },
      2: { description: 'Partly cloudy', icon: 'partly-cloudy' },
      3: { description: 'Overcast', icon: 'cloudy' },
      45: { description: 'Fog', icon: 'fog' },
      48: { description: 'Depositing rime fog', icon: 'fog' },
      51: { description: 'Light drizzle', icon: 'light-rain' },
      53: { description: 'Moderate drizzle', icon: 'rain' },
      55: { description: 'Dense drizzle', icon: 'heavy-rain' },
      61: { description: 'Slight rain', icon: 'light-rain' },
      63: { description: 'Moderate rain', icon: 'rain' },
      65: { description: 'Heavy rain', icon: 'heavy-rain' },
      71: { description: 'Slight snow', icon: 'light-snow' },
      73: { description: 'Moderate snow', icon: 'snow' },
      75: { description: 'Heavy snow', icon: 'heavy-snow' },
      77: { description: 'Snow grains', icon: 'snow' },
      80: { description: 'Slight rain showers', icon: 'light-rain' },
      81: { description: 'Moderate rain showers', icon: 'rain' },
      82: { description: 'Violent rain showers', icon: 'heavy-rain' },
      85: { description: 'Slight snow showers', icon: 'light-snow' },
      86: { description: 'Heavy snow showers', icon: 'heavy-snow' },
      95: { description: 'Thunderstorm', icon: 'thunderstorm' },
      96: { description: 'Thunderstorm with slight hail', icon: 'thunderstorm' },
      99: { description: 'Thunderstorm with heavy hail', icon: 'thunderstorm' },
    };

    return weatherCodes[code] || { description: 'Unknown', icon: 'unknown' };
  }
}

export default WeatherService;
