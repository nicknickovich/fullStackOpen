import React from 'react'
import Courses from './components/Courses'

const App = ({ courses }) => {
  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}

export default App