const express = require('express');
const app = express();

//IMPORTAR CONTROLADOR

const Blog = require('../controllers/blog.controller');

//IMPORTAR MIDDLEWARE

const { verifyToken } = require('../middlewares/autentification')

//CREACION DE RUTA HTTP

app.get('/show-blog', Blog.showBlogs);

app.post('/create-blog', verifyToken, Blog.createBlog);

app.put('/edit-blog/:id', verifyToken, Blog.editBlog);

app.delete('/delete-blog/:id', verifyToken, Blog.deleteBlog);

app.get('/show-blogImg/:image', Blog.showBlogImg);

//EXPORTAR LA RUTA

module.exports = app;