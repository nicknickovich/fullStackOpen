const listHelper = require('../utils/list_helper')

const allBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy test returns one', () => {
  const result = listHelper.dummy()
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('empty array should return zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('array of one element has as many likes', () => {
    const blogs = allBlogs.slice(0, 1)
    expect(listHelper.totalLikes(blogs)).toBe(7)
  })
  test('array of three elements', () => {
    const blogs = allBlogs.slice(0, 3)
    expect(listHelper.totalLikes(blogs)).toBe(24)
  })
})

describe('favorite blog', () => {
  test('empty array returns null', () => {
    expect(listHelper.favoriteBlog([])).toEqual(null)
  })
  test('array of one element returns that element', () => {
    const blogs = allBlogs.slice(0, 1)
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[0])
  })
  test('array of three elements', () => {
    const blogs = allBlogs.slice(0, 3)
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
  })
})

describe('most blogs', () => {
  test('empty array returns null', () => {
    expect(listHelper.mostBlogs([])).toEqual(null)
  })
  test('array of one blog returns author of that blog', () => {
    const blogs = allBlogs.slice(0, 1)
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'Michael Chan',
      blogs: 1
    })
  })
  test('array of four elements', () => {
    const blogs = allBlogs.slice(0, 4)
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  })
})

describe('most likes', () => {
  test('empty array returns null', () => {
    expect(listHelper.mostLikes([])).toEqual(null)
  })
  test('array of one element', () => {
    const blogs = allBlogs.slice(0, 1)
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'Michael Chan',
      likes: 7
    })
  })
  test('array of six elements', () => {
    const blogs = allBlogs.slice(0, 6)
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})