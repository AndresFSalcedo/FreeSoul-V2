const express = require('express');
const app = express();

//IMPORTAR CONTROLADOR

const Admins = require('../controllers/admin.controller');

//IMPORTAR MIDDLEWARE

const { verifyToken } = require('../middlewares/autentification');

//CREACION DE RUTA HTTP

app.get('/show-admins', verifyToken, Admins.showAdmins);

app.put('/edit-admin/:id', verifyToken, Admins.editAdmin);

app.post('/login', Admins.login);

//EXPORTAR LA RUTA

module.exports = app;
