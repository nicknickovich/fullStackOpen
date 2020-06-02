const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const {
  usersInDb
} = require('./test_helper')


beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({
    username: 'first',
    name: 'John Smith',
    passwordHash
  })

  await user.save()
})

describe('basic tests', () => {
  test('able to add new user', async () => {
    const usersAtStart = await usersInDb()

    const newUser = new User({
      username: 'padfoot',
      name: 'Sirius Black',
      password: 'azkabangotohell'
    })

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = await usersAtEnd(user => user.username)
    expect(usernames).toContain(newUser.username)
  })
  test('error when trying to create a user with existing username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = new User({
      username: 'first',
      name: 'John Smith',
      password: 'secret'
    })

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.errors).toContain('`username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})