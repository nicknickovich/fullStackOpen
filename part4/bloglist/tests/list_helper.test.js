const listHelper = require('../utils/list_helper')
const { initialBlogs } = require('./test_helper')


test('dummy test returns one', () => {
  const result = listHelper.dummy()
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('empty array should return zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('array of one element has as many likes', () => {
    const blogs = initialBlogs.slice(0, 1)
    expect(listHelper.totalLikes(blogs)).toBe(7)
  })
  test('array of three elements', () => {
    const blogs = initialBlogs.slice(0, 3)
    expect(listHelper.totalLikes(blogs)).toBe(24)
  })
})

describe('favorite blog', () => {
  test('empty array returns null', () => {
    expect(listHelper.favoriteBlog([])).toEqual(null)
  })
  test('array of one element returns that element', () => {
    const blogs = initialBlogs.slice(0, 1)
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[0])
  })
  test('array of three elements', () => {
    const blogs = initialBlogs.slice(0, 3)
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
  })
})

describe('most blogs', () => {
  test('empty array returns null', () => {
    expect(listHelper.mostBlogs([])).toEqual(null)
  })
  test('array of one blog returns author of that blog', () => {
    const blogs = initialBlogs.slice(0, 1)
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: '5ed602798cdfe9529a6f6f2c',
      blogs: 1
    })
  })
  test('array of four elements', () => {
    const blogs = initialBlogs.slice(0, 4)
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: '5ed602ad8cdfe9529a6f6f2d',
      blogs: 2
    })
  })
})

describe('most likes', () => {
  test('empty array returns null', () => {
    expect(listHelper.mostLikes([])).toEqual(null)
  })
  test('array of one element', () => {
    const blogs = initialBlogs.slice(0, 1)
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: '5ed602798cdfe9529a6f6f2c',
      likes: 7
    })
  })
  test('array of five elements', () => {
    const blogs = initialBlogs.slice(0, 5)
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: '5ed602ad8cdfe9529a6f6f2d',
      likes: 17
    })
  })
})