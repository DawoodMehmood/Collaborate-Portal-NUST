import React, { useState, useEffect } from 'react';
import './LoadingComponent.css'; // Import your CSS file

const LoadingComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prevVisible) => !prevVisible);
    }, 2000); // Adjust the interval duration for blinking

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="loading-container">
      {isVisible && (
        <img
          src={require('../../Icons/nustLogo2.png')} // Use require to import the image
          alt="Loading..."
          className="blinking-image"
        />
      )}
    </div>
  );
};

export default LoadingComponent;
