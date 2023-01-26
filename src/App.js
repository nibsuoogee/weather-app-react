import './App.css';
import { useState } from 'react';
import CityButton from './components/CityButton/CityButton'
import CityWeather from './components/CityWeather/CityWeather'

function App() {
  const [availableCities, setAvailableCities] = useState(["helsinki", "turku", "tampere"]);
  const [activeCity, setActiveCity] = useState(null);

  const handleActiveCity = (cityName) => {
    setActiveCity(availableCities.includes(cityName) ? cityName : null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Main-grid">
          <h1 className="Main-title">{activeCity ? activeCity.toUpperCase() : "THE WEATHER SERVICE"}</h1>
          <div className="City-content">
            {availableCities.map((city) => (
              <CityButton cityName={city} activeCity={activeCity} activateCity={handleActiveCity}/>
            ))}
            <CityWeather activeCity={activeCity} deactivateCity={handleActiveCity}/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
