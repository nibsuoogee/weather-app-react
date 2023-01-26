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
        <div>
          <CityButton cityName={availableCities[0]} activeCity={activeCity} activateCity={handleActiveCity}/>
          <CityWeather activeCity={activeCity} deactivateCity={handleActiveCity}/>
        </div>
      </header>
    </div>
  );
}

export default App;
