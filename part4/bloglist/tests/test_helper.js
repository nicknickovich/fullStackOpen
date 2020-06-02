const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: '5ed602798cdfe9529a6f6f2c',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: '5ed602ad8cdfe9529a6f6f2d',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: '5ed602ad8cdfe9529a6f6f2d',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: '5ed6258de4b16e5c8ec5a6d8',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: '5ed6258de4b16e5c8ec5a6d8',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
]

const initialUsers = [
  {
    'username': 'mikkie',
    'name': 'Michael Chan',
    'passwordHash': '$2a$10$DL7nBMjhdt3QeQLz7jv3S.jbSpyLRs50aNGJncjAMnIUBrHqAPNa6',
    '_id': '5ed602798cdfe9529a6f6f2c',
    'blogs': [
      '5a422a851b54a676234d17f7'
    ]
  },
  {
    'username': 'zero_one',
    'name': 'Edsger W. Dijkstra',
    'passwordHash': '$2a$10$YeEM5v5UsRoW0z0bPSRI0OkBVDg68AR1sXaLohZOB0YlvDm4xhzy.',
    '_id': '5ed602ad8cdfe9529a6f6f2d',
    'blogs': [
      '5a422aa71b54a676234d17f8',
      '5a422b3a1b54a676234d17f9'
    ]
  },
  {
    'username': 'robSmart',
    'name': 'Robert C. Martin',
    'passwordHash': '$2a$10$eYZ2Ae0W0JQbVGWyshrV4.ggHJHoxj1tm636E0b/66CZEyqCB.NMy',
    '_id': '5ed6258de4b16e5c8ec5a6d8',
    'blogs': [
      '5a422b891b54a676234d17fa',
      '5a422ba71b54a676234d17fb'
    ]
  },
  {
    'username': 'moony',
    'name': 'Remus Lupin',
    'passwordHash': '$2a$10$RV2H/TliAmMAnKsHg.HG5ubqyWMfl0.7MAg6qdV4BfcI1Y88Djkky',
    '_id': '5ed6264017d35a5cf97711b7',
    'blogs': []
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate(
    'author', { username: 1, name: 1 }
  )
  return blogs.map(blog => blog.toJSON())
}

const nonExistentId = async () => {
  const blog = new Blog({
    title: 'some title',
    author: '5ed6264017d35a5cf97711b7',
    url: 'http://www.some.url',
    likes: 1
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  nonExistentId,
  usersInDb
}