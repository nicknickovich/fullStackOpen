import React from 'react'

const Person = ({ name, number, onClick }) => {
  return (
    <li>{name} {number}
      <button onClick={onClick}>
        remove
      </button>
    </li>
  )
}

export default Person
