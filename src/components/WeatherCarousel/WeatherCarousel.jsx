import './WeatherCarousel.css'
import SingleDayWeather from '../SingleDayWeather/SingleDayWeather'
import { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import axios from 'axios';

const WeatherCarousel = ({activeCity, deactivateCity}) => {
    const [switchChecked, setSwitchChecked] = useState(false);
    const [cityWeatherDisplay, setCityWeatherDisplay] = useState(null);
    const [cityWeather, setCityWeather] = useState(null);
    const [currentTimeAndOffset, setCurrentTimeAndOffset] = useState(null);
    const [formattedDateToday, setFormattedDateToday] = useState(null);

    const handleSetFormattedDateToday = (date) => {
        setFormattedDateToday(date);
    }

    const handlesetSwitchChecked = (event) => {
        setSwitchChecked(event.target.checked);
        if (event.target.checked) {
            const multipleDays = [ ...cityWeather ]
            setCityWeatherDisplay(multipleDays)
        } else {
            const today = [ ...cityWeather ].filter(day => day.date === formattedDateToday);
            setCityWeatherDisplay(today ? today : null)
        }
    }


    useEffect(() => {
        // Offset can be applied dynamically below, but requires api request dictionary for zones
        // offset -120 = UTC+02
        //const offset = new Date().getTimezoneOffset() / 60 * (-1);
        const offset = 2;
        const dateToday = new Date();
        dateToday.setHours(dateToday.getHours() + offset);

        const dateTomorrow = new Date(dateToday);
        dateTomorrow.setDate(dateTomorrow.getDate() + 1 );

        const dateYesterday = new Date(dateToday);
        dateYesterday.setDate(dateYesterday.getDate() - 1);

        const formattedTimeToday = dateToday.toISOString().slice(0, 14).concat("00");
        const formattedTimeYesterday = dateYesterday.toISOString().slice(0, 14).concat("00");
        const formattedTimeTomorrow = dateTomorrow.toISOString().slice(0, 14).concat("00");
        
        const formattedDateToday = dateToday.toISOString().slice(0, 10);
        handleSetFormattedDateToday(formattedDateToday);
        const formattedDateYesterday = dateYesterday.toISOString().slice(0, 10);
        const formattedDateTomorrow = dateTomorrow.toISOString().slice(0, 10);

        let cancelToken;

        if (activeCity && !cityWeather) {
            cancelToken = axios.CancelToken.source();
            const url = new URL('https://api.open-meteo.com/v1/forecast')
            const params = new URLSearchParams(url.search);

            params.set('latitude', activeCity.latitude);
            params.set('longitude', activeCity.longitude);
            //params.set('hourly', 'temperature_2m,weathercode')
            // "Cannot initialize ForecastSurfaceVariable from invalid String value temperature_2m,weathercode for key hourly"
            // meteo api doesn't like the encoding for some reason. Let us append the hourly parameter to the url as is.
            const hourly = '&hourly=temperature_2m,weathercode';
            params.set('timezone', 'Europe/Moscow');
            params.set('start_date', formattedDateYesterday);
            params.set('end_date', formattedDateTomorrow);

            url.search = params.toString() + hourly;

            const request = axios.get(url, { cancelToken: cancelToken.token });
            console.log(request);
            request.then(response => {
                
                const time = response.data.hourly.time;
                const temperature = response.data.hourly.temperature_2m;
                const weathercode = response.data.hourly.weathercode;
        
                let indexOfWeatherToday = time.indexOf(formattedTimeToday)
                let weatherOfIndexToday = temperature[indexOfWeatherToday]
                let codeOfIndexToday = weathercode[indexOfWeatherToday]
        
                let indexOfWeatherTomorrow = time.indexOf(formattedTimeTomorrow)
                let weatherOfIndexTomorrow = temperature[indexOfWeatherTomorrow]
                let codeOfIndexTomorrow = weathercode[indexOfWeatherTomorrow]
        
                let indexOfWeatherYesterday = time.indexOf(formattedTimeYesterday)
                let weatherOfIndexYesterday = temperature[indexOfWeatherYesterday]
                let codeOfIndexYesterday = weathercode[indexOfWeatherYesterday]
        
                const newState = [
                    {date: formattedDateYesterday, temperature: weatherOfIndexYesterday, code: codeOfIndexYesterday},
                    {date: formattedDateToday, temperature: weatherOfIndexToday, code: codeOfIndexToday},
                    {date: formattedDateTomorrow, temperature: weatherOfIndexTomorrow, code: codeOfIndexTomorrow}
                ]
                setCityWeather(newState)
                const today = [ ...newState ].filter(day => day.date === formattedDateToday);
                setCityWeatherDisplay(today)
                setCurrentTimeAndOffset(`${formattedTimeToday.slice(11,16)} UTC${(offset >= 0) ? "+" : ""}${offset}`)
            }).catch(error => {
                if (axios.isCancel(error)) {
                    console.log('API Request cancelled');
                } else {
                    console.log(error)
                }
            });
        }
        return () => {
            // Cleaning up the api request
            if (cancelToken) {
                cancelToken.cancel();
            }
        }
    },  [activeCity, cityWeather]);

    
    
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
                {cityWeatherDisplay ? cityWeatherDisplay.map((day) => (
                    switchChecked ? 
                    <SingleDayWeather temperature={day.temperature} code={day.code} date={day.date}/> :
                    <SingleDayWeather temperature={day.temperature} code={day.code}/>
                )) : <label>An error occured</label>}
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

export default WeatherCarousel