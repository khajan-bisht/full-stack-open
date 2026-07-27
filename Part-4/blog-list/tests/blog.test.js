const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Blogs tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('unique id of blog post', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      assert(blog.id)
      assert.strictEqual(blog._id, undefined)
    })
  })
})

describe('Create new blog post test', () => {
  test('test create new blog', async () => {

    const newBlog =  {
      title: 'Test new bogpost feat',
      author: 'Khajan Bisht',
      url: 'https://test.com/',
      likes: 5
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogAtEnd = await helper.blogInDb()
    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)

    const titleAtEnd = blogAtEnd.map((n) => n.title)
    assert(titleAtEnd.includes('Test new bogpost feat'))
  })

  test('test like value default to 0', async () => {
    const blogWithoutLike =  {
      title: 'Test new bogpost feature without like',
      author: 'Khajan',
      url: 'https://test.com/'
    }

    const response = await api.post('/api/blogs')
      .send(blogWithoutLike)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allBlogData = await helper.blogInDb()
    const updatedBlogId = allBlogData.find((n) => n.id === response.body.id )

    assert.strictEqual(updatedBlogId.likes, 0)
  })

})

after(async () => {
  await mongoose.connection.close()
})