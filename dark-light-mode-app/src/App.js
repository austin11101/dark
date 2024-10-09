import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Map from './components/Map';  // Import the new Map component
import './App.css';
import Notifications from './components/Notifications';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/Home" element={<Home />} />
         <Route path="/notifications" element={<Notifications />} />
         <Route path="/map" element={<Map />} />
         </Routes>
      </div>
    </Router>
  );
}

export default App;
