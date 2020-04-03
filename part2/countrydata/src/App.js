import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import CountriesList from './components/CountriesList'
import OneCountry from './components/OneCountry'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(
    country => country.name.toLowerCase()
               .includes(search.toLowerCase())
  )

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const showMore = (name) => {
    setCountries(countries.map(
      country => country.name === name
                 ? { ...country, showMore: true }
                 : country
    ))
  }

  const showLess = (name) => {
    setCountries(countries.map(
      country => country.name === name
                 ? { ...country, showMore: false }
                 : country
    ))
  }

  if (countriesToShow.length === 0) {
    return (
      <div>
        <Filter
          text="find countries "
          value={search}
          onChange={handleSearchChange}
        />
        <p>no matches</p>
      </div>
    )
  } else if (countriesToShow.length === 1) {
    return (
      <div>
        <Filter
          text="find countries "
          value={search}
          onChange={handleSearchChange}
        />
        <OneCountry
          country={countriesToShow}
          showMoreOnClick={showMore}
        />
      </div>
    )
  } else if (countriesToShow.length < 11) {
    return (
      <div>
        <Filter
          text="find countries "
          value={search}
          onChange={handleSearchChange}
        />
        <CountriesList
          countries={countriesToShow}
          showMoreOnClick={showMore}
          showLessOnClick={showLess}
        />
      </div>
    )
  } else {
    return (
      <div>
        <Filter
          text="find countries "
          value={search}
          onChange={handleSearchChange}
        />
        <p>too many results</p>
      </div>
    )
  }
}

export default App
