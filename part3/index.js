const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
  const person = { ...request.body, id: id }

  if (!request.body.name) {
    return response.status(400).json({
      "error": "name missing"
    })
  }
  if (!request.body.number) {
    return response.status(400).json({
      "error": "number missing"
    })
  }
  if (persons.find(person => person.name === request.body.name)) {
    return response.status(400).json({
      "error": "name must be unique"
    })
  }

  persons = persons.concat(person)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id === id)

  response.status(204).end()
})

app.get('/info', (request, response) => {
  const timestamp = new Date()
  response.send(
    `<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${timestamp}</p>
    </div>`
  )
})

const port = 3002
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
