import './CityButton.css'

const CityButton = ({cityName, activeCity, activateCity}) => {

    return(!activeCity) ? (
        <div>
            <h1>{cityName}</h1>
            <button onClick={() => activateCity(cityName)}>Check weather</button>
        </div>
    ) : "";
}

export default CityButton