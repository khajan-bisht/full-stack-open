import Countries from './Countries'
import CountryInfo from './CountryInfo'

const SearchResults = ({
  filteredCountries,
  showCountry,
  handleOnShowCountry,
}) => {
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (filteredCountries.length === 1) {
    return <CountryInfo country={filteredCountries[0]} />
  }

  return (
    <>
      {showCountry ? <CountryInfo country={showCountry} /> : null}
      <Countries countries={filteredCountries} handleOnShowCountry={handleOnShowCountry} />
    </>
  )
}

export default SearchResults
