import './CityWeather.css'
import '../SingleDayWeather/SingleDayWeather'
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

const CityWeather = ({activeCity, deactivateCity}) => {
    const [tripleWeather, setTripleWeather] = useState(false);

    const handleSetTripleWeather = (value) => {
        setTripleWeather(value ? true : false);
      }

    return(activeCity) ? (
        <div>
            <h1>Active city: {activeCity}</h1>

            <Switch color="default"/>
            <br></br>
            <Button variant="contained" onClick={() => deactivateCity(null)}>Go back</Button>
        </div>
    ) : "";
}

export default CityWeather