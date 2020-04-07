import React from 'react'
import Person from './Person'

const Persons = (props) => {
  return (
    <ul>
      {props.persons.map(person =>
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          onClick={() => props.onClick(person)}
        />
      )}
    </ul>
  )
}

export default Persons
