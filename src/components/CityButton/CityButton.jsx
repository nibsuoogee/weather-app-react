import './CityButton.css'
import Button from '@mui/material/Button';

const CityButton = ({cityName, activeCity, activateCity}) => {

    return(!activeCity) ? (
        <div className="Check-block">
            <label>{cityName.toUpperCase()}</label>
            <Button className="text-btn" variant="contained" onClick={() => activateCity(cityName)}>Check weather</Button>
        </div>
    ) : "";
}

export default CityButton