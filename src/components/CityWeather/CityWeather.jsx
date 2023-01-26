import './CityWeather.css'
import '../SingleDayWeather/SingleDayWeather'
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

const CityWeather = ({activeCity, deactivateCity}) => {
    const [tripleWeather, setTripleWeather] = useState(false);
    /* test data */
    const [dayInfos, setDayInfos] = useState([
        {icon: "sun", temperature: -5, sky: "Clear skies"},
        {icon: "cloud", temperature: -4, sky: "Cloudy"},
        {icon: "rain", temperature: 1, sky: "Rain"}
        ,])

    const handleSetTripleWeather = (value) => {
        setTripleWeather(value ? true : false);
    }

    const WeatherTower = ({icon, temperature, sky}) => {
        return (icon && temperature && sky) ? (
            <div>
                <h1>{icon}</h1>
                <h1>{temperature}</h1>
                <h1>{sky}</h1>
            </div>
        ) : "";
    }

    return(activeCity) ? (
        <div className="Weather-content">
            <div className="WeatherCarousel">
                {dayInfos.map(({icon, temperature, sky}) => (
                    <WeatherTower icon={icon} temperature={temperature} sky={sky}/>
                ))}
            </div>
            <div className="Switch-container">
                <Switch color="default"/>
            </div>
            <label>Show 1 day / 3 days</label>
            
            <Button className="text-btn" variant="contained" onClick={() => deactivateCity(null)}>Go back</Button>
        </div>
    ) : "";
}

export default CityWeather