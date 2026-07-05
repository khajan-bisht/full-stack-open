const lodash = require('lodash')

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

const mostBlogs = (blogs) => {
  const authors = lodash.countBy(blogs, 'author')
  const [ author, blogsCount ] = lodash.maxBy(lodash.toPairs(authors), ([, count]) => count )
  return { author, blogs: blogsCount }
}

const mostLikes = (blogs) => {
  const authors = lodash.groupBy(blogs, 'author')
  const totalLikes = lodash.map(authors, (blogs, author) => ({
    author,
    likes: lodash.sumBy(blogs, 'likes')
  }))
  return lodash.maxBy(totalLikes, 'likes')
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
