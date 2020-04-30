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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}