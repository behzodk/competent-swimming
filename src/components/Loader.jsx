// src/components/Loader.jsx
import React from 'react';
import './Loader.css'; // we’ll define the CSS next

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner" />
    </div>
  );
};

export default Loader;