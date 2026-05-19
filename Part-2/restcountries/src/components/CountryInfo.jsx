import WeatherInfo from './WeatherInfo'

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
      {Object.values(country.languages).map(language => (
        <li key={language}>{language}</li>
      ))}
     </ul>
      <img src={country.flags.png} alt="flag" />
      <WeatherInfo country={country} />
    </div>
  )
}

export default CountryInfo