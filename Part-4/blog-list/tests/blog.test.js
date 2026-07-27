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

describe('When blogs are initally saved to test db', () => {
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

  test('Check each blog post has unique id defined', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      assert(blog.id)
      assert.strictEqual(blog._id, undefined)
    })
  })

})

describe('Adding new blog post', () => {
  test('success create new blog', async () => {

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

  test('test missing like value default to 0', async () => {
    const blogWithoutLike =  {
      title: 'Test new bogpost feature without like',
      author: 'Khajan',
      url: 'https://test.com/'
    }

    const response = await api.post('/api/blogs')
      .send(blogWithoutLike)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogAtEnd = await helper.blogInDb()
    const updatedBlogId = blogAtEnd.find((n) => n.id === response.body.id )

    assert.strictEqual(updatedBlogId.likes, 0)
    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)
  })

  test('test new blog without title', async () => {
    const blogWithoutTitle =  {
      author: 'Without title',
      url: 'https://test.com/',
      likes: 2
    }

    await api.post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogAtEnd = await helper.blogInDb()
    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length)
  })

  test('test new blog without url', async () => {
    const blogWithoutUrl =  {
      author: 'Without url',
      title: 'This post is without url',
      likes: 3
    }

    await api.post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogAtEnd = await helper.blogInDb()
    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length)
  })

})

describe('Deleting new blog post', () => {
  test('sucess deleted blog post id with status 204', async () => {
    const blogAtStart = await helper.blogInDb()
    const blogToDelete = blogAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogAtEnd = await helper.blogInDb()

    const ids = blogAtEnd.map(n => n.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length - 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})