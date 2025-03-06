import React from "react";
import './Input.css';

const Input = ({ value, onChange, placeholder, onKeyPress }) => {
  return (
    <input 
      type="text"
      className="search-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyPress={onKeyPress}
    />
  );
};

export default Input;