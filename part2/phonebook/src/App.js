import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'


const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(personsData => setPersons(personsData))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const allPersonsNames = persons.map(
      person => person.name
    )
    if (allPersonsNames.includes(newPerson.name)) {
      alert(`${newPerson.name} is already in the phonebook`)
    } else {
      personsService
        .create(newPerson)
        .then(personsData => {
          setPersons(persons.concat(personsData))
          setNewName('')
          setNewNumber('')
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const personsToShow = persons.filter(
    person => person.name.toLowerCase()
              .includes(search.toLowerCase())
  )

const removePerson = (person) => {
  if (window.confirm(`Remove ${person.name}?`)){
    personsService
    .remove(person.id)
    .then(personsData => {
      setPersons(persons.filter(n => n.id !== person.id))
    })
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        text="filter shown with:"
        value={search}
        onChange={handleSearchChange}
      />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h3>Numbers</h3>
        <Persons persons={personsToShow} onClick={removePerson} />
    </div>
  )
}

export default App
