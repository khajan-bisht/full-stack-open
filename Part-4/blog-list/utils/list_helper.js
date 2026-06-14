const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favblog, blog) => {
    return favblog.likes > blog.likes ? favblog : blog
  }
  return blogs.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
