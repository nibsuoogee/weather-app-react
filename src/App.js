import React from 'react'
import './App.css';
import { useState } from 'react';
import CityButton from './components/CityButton/CityButton';
import CityWeather from './components/CityWeather/CityWeather';

function App() {
  const [availableCities, setAvailableCities] = useState([
    {name: "Helsinki", longitude: 60.17, latitude: 24.95},
    {name: "Turku", longitude: 60.45, latitude: 22.28},
    {name: "Tampere", longitude: 61.50, latitude: 23.80}
  ]);
  
  const [activeCity, setActiveCity] = useState(null);

  const handleActiveCity = (cityName) => {
    const cityToActivate = availableCities.find(city => city.name === cityName);
    setActiveCity(cityToActivate ? cityToActivate : null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Main-grid">
          <h1 className="Main-title">{activeCity ? activeCity.name.toUpperCase() : "THE WEATHER SERVICE"}</h1>
          <div className="City-content">
            {availableCities.map((city) => (
              <CityButton cityName={city.name} activeCity={activeCity} activateCity={handleActiveCity}/>
            ))}
            <CityWeather activeCity={activeCity} deactivateCity={handleActiveCity}/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
