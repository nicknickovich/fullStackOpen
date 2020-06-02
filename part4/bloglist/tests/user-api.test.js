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

    const newUser = {
      username: 'padfoot',
      name: 'Sirius Black',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = await usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })
  test('error when trying to create a user with existing username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'first',
      name: 'John Smith',
      password: 'secret'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('error if username is less than 3 characters', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'fi',
      name: 'John Smith',
      password: 'secret'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toMatch(/username.*is shorter than the minimum allowed length/)
    console.log(result.body.error)
    const usersAtEnd = await usersInDb()
    expect(usersAtStart).toHaveLength(usersAtEnd.length)
  })
  test('error if password is less than 3 characters', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'first',
      name: 'John Smith',
      password: 'se'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('password should be more than 3 characters long')
    const usersAtEnd = await usersInDb()
    expect(usersAtStart).toHaveLength(usersAtEnd.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})