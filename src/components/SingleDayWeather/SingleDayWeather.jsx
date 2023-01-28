import './SingleDayWeather.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faCloudRain, faCloudShowersHeavy, faSnowflake, faSun, faBolt, faSmog, faWind, faCloudBolt, faTornado, faCloudMeatball, faCloudShowersWater } from '@fortawesome/free-solid-svg-icons'

const SingleDayWeather = ({date, temperature, code}) => {

    library.add(faCloud, faCloudRain, faCloudShowersHeavy, faSnowflake, faSun, faBolt, faSmog, faWind)

    const weatherCodes = [
        {
          floor: 0,
          description: "Clear skies",
          icon: faSun
        },
        {
          floor: 1,
          description: "Mainly clear",
          icon: faSun
        },
        {
          floor: 2,
          description: "Partly cloudy",
          icon: faCloud
        },
        {
          floor: 3,
          description: "Overcast",
          icon: faCloud
        },
        {
          floor: 4,
          description: "Smog",
          icon: faSmog
        },
        {
          floor: 5,
          description: "haze",
          icon: faSmog
        },
        {
          floor: 6,
          description: "Dust wind",
          icon: faWind
        },
        {
          floor: 10,
          description: "Mist",
          icon: faSmog
        },
        {
          floor: 13,
          description: "Lightning",
          icon: faBolt
        },
        {
          floor: 14,
          description: "Precipitation",
          icon: faCloudRain
        },
        {
          floor: 17,
          description: "Thunderstorm",
          icon: faCloudBolt
        },
        {
          floor: 18,
          description: "Squalls",
          icon: faWind
        },
        {
          floor: 19,
          description: "Funnel clouds",
          icon: faTornado
        },
        {
          floor: 20,
          description: "Rain",
          icon: faCloudRain
        },
        {
          floor: 22,
          description: "Rain and snow",
          icon: faCloudMeatball
        },
        {
          floor: 24,
          description: "Drizzle",
          icon: faCloudRain
        },
        {
          floor: 25,
          description: "Showers",
          icon: faCloudShowersWater
        },
        {
          floor: 28,
          description: "Ice fog",
          icon: faSnowflake
        },
        {
          floor: 29,
          description: "Thunderstorm",
          icon: faCloudBolt
        },
        {
          floor: 30,
          description: "Dust storm",
          icon: faWind
        },
        {
          floor: 36,
          description: "Blowing snow",
          icon: faSnowflake
        },
        {
          floor: 40,
          description: "Fog",
          icon: faSmog
        },
        {
          floor: 50,
          description: "Drizzle",
          icon: faCloudRain
        },
        {
          floor: 58,
          description: "Rain",
          icon: faCloudRain
        },
        {
          floor: 70,
          description: "Snow",
          icon: faSnowflake
        },
        {
          floor: 80,
          description: "Rain showers",
          icon: faCloudShowersWater
        },
        {
          floor: 83,
          description: "Rain and snow showers",
          icon: faCloudShowersWater
        },
        {
          floor: 85,
          description: "Snow showers",
          icon: faCloudMeatball
        },
        {
          floor: 87,
          description: "Hail",
          icon: faCloudMeatball
        },
        {
          floor: 91,
          description: "Rain",
          icon: faCloudShowersWater
        },
        {
          floor: 93,
          description: "Snow",
          icon: faSnowflake
        },
        {
          floor: 95,
          description: "Thunderstorm",
          icon: faCloudBolt
        }
      ];

    if (temperature && (code !== null)) {
      let floorCode = 0;
      for (let i = 0; i < weatherCodes.length; i++) {
          if (code === weatherCodes[i].floor) {
              floorCode = code;
              break;
          } else if (code < weatherCodes[i].floor) {
              floorCode = weatherCodes[i-1].floor;
              break;
          }
      }

      const weather = weatherCodes.find(obj => obj.floor === floorCode)

      const ShowDate = (date) => {
        const formattedDate = date.replace('-','.');
        return formattedDate ? <h1>{formattedDate}</h1> : "";
      }

      return(
        <div className="Weather-tower">
          <div>
            {date ? ShowDate(date) : ""}
          </div>
        <div>
            <FontAwesomeIcon icon={weather.icon} size="4x"/>
            <h1>{temperature}</h1> 
            <h1>{weather.description}</h1> 
        </div>
        </div>
        
      );
    
    }
    return("");

}

export default SingleDayWeather