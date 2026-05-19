import { useEffect, useState } from 'react'
import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY

const WeatherInfo = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState('')

  // To get latitude and longitude using direct geocoding API https://openweathermap.org/api/geocoding-api?collection=other
  const weatherUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&limit=1&appid=${apiKey}`

  useEffect(() => {
    axios.get(weatherUrl).then(response => {
      const latitude = response.data[0].lat
      const longitude = response.data[0].lon

      // To get weather data using the latitude and longitude from the API
      const weatherDataUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      
      axios.get(weatherDataUrl).then((response) => {
        setWeather(response.data)
        setStatus('success')
      })
      .catch(error => {
        console.error('Error fetching weather data:', error)
        setStatus('error')
      })
    })
    .catch(error => {
      console.error('Error fetching latitude and longitude:', error)
      setStatus('error')
    })
  }, [country])

  return (
    <>
      {status === 'success' && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature {weather.main.temp} Celcius</p>
          <img src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`} alt="weather icon" style={{width: '100px', height: '100px'}} />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      )}
      {status === 'error' && <p>Error fetching weather data</p>}
    </>
  )
}

export default WeatherInfo
