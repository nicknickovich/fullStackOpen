import React from 'react'

const CountriesList = (props) => {
  return (
    <ul>
      {props.countries.map(
        country => <li key={country.alpha3Code}>{country.name}</li>
      )}
    </ul>
  )
}

export default CountriesList
