import './App.css';
import { useState } from 'react';
import CityButton from './components/CityButton/CityButton';
import CityWeather from './components/CityWeather/CityWeather';
import axios from 'axios';

function App() {
  const [availableCities, setAvailableCities] = useState([
    {city: "Helsinki", longitude: 60.17, latitude: 24.95},
    {city: "Turku", longitude: 60.45, latitude: 22.28},
    {city: "Tampere", longitude: 61.50, latitude: 23.80}
  ]);
  
  const [activeCity, setActiveCity] = useState(null);

  const handleActiveCity = (cityName) => {
    setActiveCity(availableCities.includes(cityName) ? cityName : null);
  }

  // offset -120 = UTC+02
  var offset = new Date().getTimezoneOffset() / 60 * (-1);
  console.log(offset);

  const dateToday = new Date();
  dateToday.setHours(dateToday.getHours() + offset);

  const dateTomorrow = new Date();
  dateTomorrow.setHours(dateTomorrow.getHours() + offset);
  dateTomorrow.setDate(dateTomorrow.getDate() + 1 );

  const dateYesterday = new Date();
  dateYesterday.setHours(dateYesterday.getHours() + offset);
  dateYesterday.setDate(dateYesterday.getDate() - 1);

  const formattedTimeToday = dateToday.toISOString().slice(0, 14).concat("00");
  const formattedTimeYesterday = dateTomorrow.toISOString().slice(0, 14).concat("00");
  const formattedTimeTomorrow = dateYesterday.toISOString().slice(0, 14).concat("00");
  
  const formattedDateToday = dateToday.toISOString().slice(0, 10);
  const formattedDateYesterday = dateYesterday.toISOString().slice(0, 10);
  const formattedDateTomorrow = dateTomorrow.toISOString().slice(0, 10);
  
  console.log(formattedTimeToday);
  console.log(formattedTimeYesterday);
  console.log(formattedTimeTomorrow);

  console.log(formattedDateToday);
  console.log(formattedDateYesterday);
  console.log(formattedDateTomorrow);



  const requests = availableCities.map(city => {
    return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${city.longitude}&longitude=${city.latitude}&hourly=temperature_2m,weathercode&timezone=Europe%2FMoscow&start_date=${formattedDateYesterday}&end_date=${formattedDateTomorrow}`)
  });

  Promise.all(requests)
  .then(responses => {
    console.log(responses);
  });
  
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
