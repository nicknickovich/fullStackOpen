import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personsService from './services/persons'
import './index.css'


const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)

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
      if (window.confirm(
        `${newPerson.name} is already in the phonebook, `
        + `replace old number with a new one?`)) {
        const personToChange = persons.find(
          person => person.name === newPerson.name
        )
        const changedPerson = { ...personToChange, number: newNumber }
        personsService
          .update(changedPerson.id, newPerson)
          .then(updatedPersonData => {
            setPersons(persons.map(person =>
              person.id === updatedPersonData.id ? changedPerson : person
            ))
            setNewName('')
            setNewNumber('')
          })
          .then(() => {
            setNotificationMessage(`Updated ${newPerson.name}'s number`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }
    } else {
      personsService
        .create(newPerson)
        .then(personsData => {
          setPersons(persons.concat(personsData))
          setNewName('')
          setNewNumber('')
        })
        .then(() => {
          setNotificationMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
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
    .then(
      setPersons(persons.filter(n => n.id !== person.id))
    )
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        className="success"
      />
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
