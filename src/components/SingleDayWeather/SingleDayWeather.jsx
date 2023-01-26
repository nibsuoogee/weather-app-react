import './SingleDayWeather.css'

const SingleDayWeather = ({activeCity, deactivateCity}) => {

    return(activeCity) ? (
        <div>
            <h1>Active city: {activeCity}</h1>


            <button onClick={() => deactivateCity(null)}>Go back</button>
        </div>
    ) : "";
}

export default SingleDayWeather