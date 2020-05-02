const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue['likes']
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const likes = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...likes)
  return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authorBlogCount = _.countBy(blogs, x => x['author'])
  const maxBlogCount = Math.max(...Object.values(authorBlogCount))
  const authorMostBlogs = Object.keys(authorBlogCount).find(
    key => authorBlogCount[key] === maxBlogCount
  )
  return {
    author: authorMostBlogs,
    blogs: authorBlogCount[authorMostBlogs]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const blogsByAuthor = Object.entries(_.groupBy(blogs, x => x['author'])).map(
    entry => ({ [entry[0]]: entry[1] })
  )
  const likesByAuthor = blogsByAuthor.map(
    author => ({
      author: Object.keys(author)[0],
      likes: _.reduce(Object.values(author)[0].map(
        blog => blog.likes), (sum, x) => sum + x
      )
    })
  )
  const mostLikes = Math.max(...likesByAuthor.map(
    x => x['likes']
  ))
  console.log(mostLikes)
  return likesByAuthor.find(author => author.likes === mostLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}