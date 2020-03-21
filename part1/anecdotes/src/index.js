import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Paragraph = ({ text }) => {
  return (
    <p>{text}</p>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = (props) => {
  const [ selected, setSelected ] = useState(0)
  const [ rating, setRating ] = useState(
    new Array(props.anecdotes.length).fill(0)
  )

  const handleNext = () => {
    return setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const handleVote = () => {
    const newRating = [...rating]
    newRating[selected] += 1
    return setRating(newRating)
  }

  const getAnecdoteWithMostVotes = () => {
    const maxRating = Math.max(...rating)
    const index = rating.indexOf(maxRating)
    return props.anecdotes[index]
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Paragraph text={props.anecdotes[selected]} />
      <Paragraph text={`has ${rating[selected]} votes`} />
      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleNext} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <Paragraph text={getAnecdoteWithMostVotes()} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
