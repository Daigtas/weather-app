import React from "react";
import './Spinner.css';

const Spinner = ({ size = "medium" }) => {
  return (
    <div className={`spinner-container size-${size}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
