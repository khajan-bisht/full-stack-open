import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import SearchResults from './components/SearchResults'
import fetchCountry from './services/fetchCountry'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [showCountry, setShowCountry] = useState(null)

  useEffect(() => {
    fetchCountry().then(initialCountries => {
      setCountries(initialCountries)
    })
    .catch(error => {
      console.error('Error fetching countries:', error)
    })
  }, [])

  const filteredCountries = filter
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        )
      : []

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShowCountry(null)
  }

  const handleOnShowCountry = (country) => {
    setShowCountry(country)
  }

  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <SearchResults
        filteredCountries={filteredCountries}
        showCountry={showCountry}
        handleOnShowCountry={handleOnShowCountry}
      />
    </>
  )
}

export default App