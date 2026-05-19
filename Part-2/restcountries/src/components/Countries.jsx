const Countries = ({ countries, handleOnShowCountry }) => {
    return (
        <>
            { countries.length > 0 && countries.map((country) => (
             <p key={country.name.common}>
                {country.name.common }<button onClick={() => handleOnShowCountry(country)}>show</button>
            </p>
        ))}
    </>
  )
}

export default Countries