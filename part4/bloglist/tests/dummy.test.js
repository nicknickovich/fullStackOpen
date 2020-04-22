const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('empty array should return zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('array of one element has as many likes', () => {
    const blogs = [
      {
        id: 1,
        likes: 1
      }
    ]
    expect(listHelper.totalLikes(blogs)).toBe(1)
  })
  test('array of three elements', () => {
    const blogs = [
      {
        id: 1,
        likes: 1
      },
      {
        id: 2,
        likes: 2
      },
      {
        id: 3,
        likes: 3
      }
    ]
    expect(listHelper.totalLikes(blogs)).toBe(6)
  })
})