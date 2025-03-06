class CityService {
  static async getCityCoordinates(cityName) {
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        return {
          latitude: result.latitude,
          longitude: result.longitude,
          name: result.name,
          country: result.country,
          timezone: result.timezone
        };
      } else {
        console.error('No results found for the city');
        return null;
      }
    } catch (error) {
      console.error('Error fetching city coordinates:', error);
      throw error;
    }
  }
}

export default CityService;
