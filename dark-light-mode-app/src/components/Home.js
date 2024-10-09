import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png'; 

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationTime, setNotificationTime] = useState('');  // State to store timestamp

  const toggleMode = (mode) => {
    const newMode = mode === 'on';
    setDarkMode(newMode);
    
    // Notify server about button press
    fetch('http://localhost:5000/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        button: mode,
        mode: newMode ? 'dark' : 'light',
      }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Notification sent successfully:', data);
      setNotificationTime(data.timestamp);  
    })
    .catch((error) => {
      console.error('Error sending notification:', error);
    });
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
    <img src={logo} alt="Company Logo" style={{ width: '650px', height: '650px' }} />
      <h2>Home Page</h2>
      <div className="button-container">
        <button onClick={() => toggleMode('on')}>On</button>
        <button onClick={() => toggleMode('off')}>Off</button>
        <Link to="/map" style={{ marginLeft: '10px' }}>
          <button>Open Map</button>
        </Link>
      </div>

      
      {notificationTime && (
        <p>Last button press recorded at: {notificationTime}</p>
      )}
    </div>
  );
};

export default Home;
