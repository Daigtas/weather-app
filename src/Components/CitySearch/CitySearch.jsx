import React, { useContext, useState } from "react";
import { WeatherContext } from "../../Context";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Spinner from "../Spinner/Spinner";
import './CitySearch.css';

const CitySearch = () => {
  const [inputValue, setInputValue] = useState("");
  const { searchCity, loading, error } = useContext(WeatherContext);

  const handleSearch = () => {
    if (inputValue.trim()) {
      searchCity(inputValue.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="city-search">
      <div className="search-container">
        <Input 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name"
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleSearch} className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>
      
      {loading && <div className="loading-indicator"><Spinner size="small" /></div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CitySearch;