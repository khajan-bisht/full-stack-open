// This file is used to test mongodb connection and create test blog in database
// To run the file: node mongo.js <password>


const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://anon_db_user:${password}@cluster0.ijaht4w.mongodb.net/blog?appName=Cluster0`


mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
  })

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: 'Blog 1',
    author: 'Khajan Bisht',
    url: 'https://www.test.com',
    likes: 10,
})

blog.save().then((result) => {
    console.log('blog saved')
    mongoose.connection.close()
})

