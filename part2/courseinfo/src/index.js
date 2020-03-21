import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map(part =>
        <Part part={part} key={part.id} />
      )}
    </>
  )
}

// const Total = (props) => {
//   const [ part1, part2, part3 ] = props.course.parts
//   return (
//     <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
//   )
// }

const Course = ({ course }) => {
  return(
    <div>
      <Header course={course} />
      <Content course={course} />
      {/* <Total course={course} /> */}
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
