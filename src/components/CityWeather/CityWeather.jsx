import './CityWeather.css'
import SingleDayWeather from '../SingleDayWeather/SingleDayWeather'
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import axios from 'axios';

const CityWeather = ({activeCity, deactivateCity}) => {
    const [switchChecked, setSwitchChecked] = useState(false);
    const [cityWeatherDisplay, setCityWeatherDisplay] = useState(null);
    const [cityWeather, setCityWeather] = useState(null);
    const [currentTimeAndOffset, setCurrentTimeAndOffset] = useState(null);

    const handlesetSwitchChecked = (event) => {
        setSwitchChecked(event.target.checked);
        if (event.target.checked) {
            const multipleDays = [ ...cityWeather ]
            setCityWeatherDisplay(multipleDays)
        } else {
            const multipleDays = [ ...cityWeather ]
            const today = multipleDays.filter(day => day.date === formattedDateToday);
            setCityWeatherDisplay(today)
        }
    }

    const handleSetCityWeather = (response)  => {
        // offset -120 = UTC+02
        var offset = new Date().getTimezoneOffset() / 60 * (-1);
    
        const dateToday = new Date();
        dateToday.setHours(dateToday.getHours() + offset);
    
        const dateTomorrow = new Date();
        dateTomorrow.setHours(dateTomorrow.getHours() + offset);
        dateTomorrow.setDate(dateTomorrow.getDate() + 1 );
    
        const dateYesterday = new Date();
        dateYesterday.setHours(dateYesterday.getHours() + offset);
        dateYesterday.setDate(dateYesterday.getDate() - 1);
    
        const formattedTimeToday = dateToday.toISOString().slice(0, 14).concat("00");
        const formattedTimeYesterday = dateYesterday.toISOString().slice(0, 14).concat("00");
        const formattedTimeTomorrow = dateTomorrow.toISOString().slice(0, 14).concat("00");
        
        const formattedDateToday = dateToday.toISOString().slice(5, 10);
        const formattedDateYesterday = dateYesterday.toISOString().slice(5, 10);
        const formattedDateTomorrow = dateTomorrow.toISOString().slice(5, 10);
    
        let indexOfWeatherToday = response.data.hourly.time.indexOf(formattedTimeToday)
        let weatherOfIndexToday = response.data.hourly.temperature_2m[indexOfWeatherToday]
        let codeOfIndexToday = response.data.hourly.weathercode[indexOfWeatherToday]

        let indexOfWeatherTomorrow = response.data.hourly.time.indexOf(formattedTimeTomorrow)
        let weatherOfIndexTomorrow = response.data.hourly.temperature_2m[indexOfWeatherTomorrow]
        let codeOfIndexTomorrow = response.data.hourly.weathercode[indexOfWeatherTomorrow]

        let indexOfWeatherYesterday = response.data.hourly.time.indexOf(formattedTimeYesterday)
        let weatherOfIndexYesterday = response.data.hourly.temperature_2m[indexOfWeatherYesterday]
        let codeOfIndexYesterday = response.data.hourly.weathercode[indexOfWeatherYesterday]

        const newState = [
            {date: formattedDateYesterday, temperature: weatherOfIndexYesterday, code: codeOfIndexYesterday},
            {date: formattedDateToday, temperature: weatherOfIndexToday, code: codeOfIndexToday},
            {date: formattedDateTomorrow, temperature: weatherOfIndexTomorrow, code: codeOfIndexTomorrow}
        ]
        setCityWeather(newState)
        const multipleDays = [ ...newState ]
        const today = multipleDays.filter(day => day.date === formattedDateToday);
        setCityWeatherDisplay(today)
        setCurrentTimeAndOffset(`${formattedTimeToday.slice(11,16)} UTC${(offset >= 0) ? "+" : ""}${offset}`)
    }

    // offset -120 = UTC+02
    var offset = new Date().getTimezoneOffset() / 60 * (-1);

    const dateToday = new Date();
    dateToday.setHours(dateToday.getHours() + offset);

    const dateTomorrow = new Date();
    dateTomorrow.setHours(dateTomorrow.getHours() + offset);
    dateTomorrow.setDate(dateTomorrow.getDate() + 1 );

    const dateYesterday = new Date();
    dateYesterday.setHours(dateYesterday.getHours() + offset);
    dateYesterday.setDate(dateYesterday.getDate() - 1);

    const formattedDateToday = dateToday.toISOString().slice(5, 10);
    const formattedDateYesterday = dateYesterday.toISOString().slice(0, 10);
    const formattedDateTomorrow = dateTomorrow.toISOString().slice(0, 10);
    
    if (activeCity && !cityWeather) {
        const request = axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${activeCity.latitude}&longitude=${activeCity.longitude}&hourly=temperature_2m,weathercode&timezone=Europe%2FMoscow&start_date=${formattedDateYesterday}&end_date=${formattedDateTomorrow}`);
        
        request.then(response => {
            handleSetCityWeather(response);
        });
    }
    
    const handleWeatherResetAndQuit = () => {
        deactivateCity(null);
        setCityWeather(null);
        setCityWeatherDisplay(null);
        setSwitchChecked(false);
    }

    return(activeCity && cityWeather) ? (
        <div className="Weather-content">
            {currentTimeAndOffset ? <label>Information for {currentTimeAndOffset} on each day.</label> : ""}
            <div className="Weather-Carousel">
                {cityWeatherDisplay.map((day) => (
                    switchChecked ? 
                    <SingleDayWeather temperature={day.temperature} code={day.code} date={day.date}/> :
                    <SingleDayWeather temperature={day.temperature} code={day.code}/>
                ))}
            </div>
            <div className="Switch-container">
                <Switch onChange={handlesetSwitchChecked} checked={switchChecked} color="default"/>
            </div>
            <label>Show 1 day / 3 days</label>
            <div>
                <Button className="text-btn" variant="contained" onClick={() => handleWeatherResetAndQuit()}>Go back</Button>
            </div>
        </div>
    ) : "";
}

export default CityWeather