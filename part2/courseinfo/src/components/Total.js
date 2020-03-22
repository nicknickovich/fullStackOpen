import React from 'react'

const Total = ({ course }) => {
  const total = course.parts.map(part => part.exercises).reduce(
    (accumulator, currentValue) => accumulator + currentValue 
  )
  return (
    <p>Number of exercises {total}</p>
  )
}

export default Total