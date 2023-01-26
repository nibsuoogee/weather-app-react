import './CityButton.css'
import Button from '@mui/material/Button';

const CityButton = ({cityName, activeCity, activateCity}) => {

    return(!activeCity) ? (
        <div>
            <h1>{cityName.toUpperCase()}</h1>
            <Button className="text-btn" variant="contained" onClick={() => activateCity(cityName)}>Check weather</Button>
        </div>
    ) : "";
}

export default CityButton