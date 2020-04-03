import React from 'react'
import OneCountry from './OneCountry'

const CountriesList = (props) => {

  return (
    <ul>
      {props.countries.map(country => {
        if (country.showMore) {
          return (
            <li key={country.alpha3Code}>
              {country.name}
              <button onClick={() => props.showLessOnClick(country.name)}>
                hide
              </button>
              <OneCountry country={country} />
            </li>
          )
        } else {
          return (
          <li key={country.alpha3Code}>
            {country.name}
            <button onClick={() => props.showMoreOnClick(country.name)}>
              show
            </button>
          </li>
          )
        }
      })}
    </ul>
  )
}

export default CountriesList
