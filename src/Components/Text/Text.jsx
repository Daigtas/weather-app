import React from "react";
import './Text.css';

const Text = ({ variant = "normal", children, className }) => {
  const getElementByVariant = () => {
    switch (variant) {
      case "title":
        return <h1 className={`text-title ${className || ''}`}>{children}</h1>;
      case "subtitle":
        return <h2 className={`text-subtitle ${className || ''}`}>{children}</h2>;
      case "large":
        return <p className={`text-large ${className || ''}`}>{children}</p>;
      case "temperature":
        return <span className={`text-temperature ${className || ''}`}>{children}</span>;
      default:
        return <p className={`text-normal ${className || ''}`}>{children}</p>;
    }
  };

  return getElementByVariant();
};

export default Text;