import './CityButton.css'
import Button from '@mui/material/Button';

const CityButton = ({cityName, activeCity, activateCity}) => {

    return(!activeCity) ? (
        <div>
            <h1>{cityName}</h1>
            <Button variant="contained" onClick={() => activateCity(cityName)}>Check weather</Button>
        </div>
    ) : "";
}

export default CityButton