import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    {
      name: 'Arto Hellas',
      tel: '12-34-987654',
      id: 1
    }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      tel: newNumber,
      id: persons.length + 1
    }
    const allPersonsNames = persons.map(
      person => person.name
    )
    if (allPersonsNames.includes(newPerson.name)) {
      alert(`${newPerson.name} is already in the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person =>
            <Person
              key={person.id}
              name={person.name}
              tel={person.tel}
            />
          )}
        </ul>
    </div>
  )
}

export default App
