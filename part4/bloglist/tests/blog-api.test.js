const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const {
  initialBlogs,
  initialUsers,
  blogsInDb,
  nonExistentId
} = require('./test_helper')


const AUTHORS = {
  CHAN: {
    id: '5ed602798cdfe9529a6f6f2c',
    username: 'mikkie',
    name: 'Michael Chan'
  },
  DIJKSTRA: {
    id: '5ed602ad8cdfe9529a6f6f2d',
    username: 'zero_one',
    name: 'Edsger W. Dijkstra'
  },
  MARTIN: {
    id: '5ed6258de4b16e5c8ec5a6d8',
    username: 'robSmart',
    name: 'Robert C. Martin'
  }
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (let user of initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('get requests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are fetched', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })
  test('a specific blog has right content', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body

    expect(contents[1]).toEqual({
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: AUTHORS.DIJKSTRA,
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    })
  })
  test('fetch specific blog', async () => {
    const response = await api.get(`/api/blogs/${initialBlogs[1]['_id']}`)
    expect(response.body).toEqual({
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: AUTHORS.DIJKSTRA,
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    })
  })
  test('returned objects have attribute id', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body

    expect(contents[2]['id']).toBeDefined()
  })
  test('404 when blog does not exist', async () => {
    const fakeId = await nonExistentId()
    await api
      .get(`/api/blogs/${fakeId}`)
      .expect(404)
  })
})

describe('post requests', () => {
  test('able to add a blog', async () => {
    const newBlog = {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: '5ed6258de4b16e5c8ec5a6d8',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
    expect(blogsAtEnd[initialBlogs.length]).toEqual({
      id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: AUTHORS.MARTIN,
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    })
  })
  test('if not specified, number of likes defaults to 0', async () => {
    const newBlog = {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: '5ed6258de4b16e5c8ec5a6d8',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      __v: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)

    const blogsAtEnd = await blogsInDb()
    const newBlogLikes = blogsAtEnd[initialBlogs.length]['likes']
    expect(newBlogLikes).toBe(0)
  })
  test('error if url is not specified', async () => {
    const newBlog = {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: '5ed6258de4b16e5c8ec5a6d8',
      likes: 2,
      __v: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
  test('error if title is not specified', async () => {
    const newBlog = {
      _id: '5a422bc61b54a676234d17fc',
      author: '5ed6258de4b16e5c8ec5a6d8',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('put requests', () => {
  test('able to update a blog', async () => {
    const updatedBlog = {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: '5ed602798cdfe9529a6f6f2c',
      url: 'https://reactpatterns.com/',
      likes: 8,
      __v: 0
    }
    await api
      .put(`/api/blogs/${updatedBlog._id}`)
      .send(updatedBlog)

    const blogAfterUpdate = await api.get(`/api/blogs/${updatedBlog._id}`)
    expect(blogAfterUpdate.body.likes).toBe(8)
  })
})

describe('delete requests', () => {
  test('able to delete a blog', async () => {
    await api
      .delete(`/api/blogs/${initialBlogs[0]._id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
    expect(blogsAtEnd.map(blog => blog.id)).not.toContain(initialBlogs[0]._id)
  })
})


afterAll(() => {
  mongoose.connection.close()
})