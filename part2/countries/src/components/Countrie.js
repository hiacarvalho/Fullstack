import axios from 'axios'
import { useState, useEffect} from "react";

const Countrie = ({ countrie }) => {
    const [weather, setWeather] = useState({temperature: '', wind_speed: '', weather_icon: ''})
    const languages = Object.values(countrie.languages)
    const [lat, long] = countrie.latlng

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
          const temp = response.data.main.temp - 273.15
          const wind_speed = response.data.wind.speed
          const weather = response.data.weather
          console.log(temp, wind_speed, weather[0].icon)
          setWeather({temperature: temp.toFixed(1), wind_speed, weather_icon: weather[0].icon})
        })
        .catch(error => console.log(error))
    }, [lat, long])

    return (
        <div>
            <h1>{countrie.name.common}</h1>
            <p>Capital {countrie.capital}</p>
            <p>Area {countrie.area}</p>
            <h2>Languages</h2>
            <ul>{languages.map(language => <li key={language}>{language}</li>)}</ul>
            <img src={countrie.flags.svg} alt={countrie.flags.alt} width='200'/>
            <h2>Weather in {countrie.capital}</h2>
            <p>Temperature: {weather.temperature} Celsius</p>
            <p>Wind: {weather.wind_speed} m/s</p>
            <img src={`http://openweathermap.org/img/w/${weather.weather_icon}.png`} alt='weather icon' width='50'/>
        </div>
    )
}

export default Countrie