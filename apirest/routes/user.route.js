const express = require('express');
const app = express();

//IMPORTAR CONTROLADOR

const User = require('../controllers/user.controller');

//IMPORTAR MIDDLEWARE

const { verifyToken } = require('../middlewares/autentification')

//CREACION DE RUTA HTTP

app.get('/show-user', verifyToken, User.showUser);

app.post('/create-user', User.createUser);

app.delete('/delete-user/:id', verifyToken, User.deleteUser);

//EXPORTAR LA RUTA

module.exports = app;