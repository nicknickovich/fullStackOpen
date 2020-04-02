import React from 'react'

const OneCountry = (props) => {
  const country = props.countries[0]
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h4>languages</h4>
      <ul>
        {country.languages.map(
          language => <li key={language.iso639_2}>{language.name}</li>
        )}
      </ul>
      <p>
        <img src={country.flag} alt="country flag" width="200" />
      </p>
    </div>
  )
}

export default OneCountry
