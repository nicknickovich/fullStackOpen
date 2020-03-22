import React from 'react'
import Course from './Course'

const Courses = ({ courses }) => {
  return (
    courses.map(course =>
      <Course course={course} key={course.id} />
    )
  )
}

export default Courses