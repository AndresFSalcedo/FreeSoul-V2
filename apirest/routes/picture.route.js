const express = require('express');
const app = express();

//IMPORTAR CONTROLADOR

const Picture = require('../controllers/picture.controller');

//IMPORTAR MIDDLEWARE

const { verifyToken } = require('../middlewares/autentification');

//CREACION DE RUTA HTTP

app.get('/show-pictures', Picture.showPictures);

app.post('/create-Picture', verifyToken, Picture.createPicture);

app.put('/edit-Picture/:id', verifyToken, Picture.editPicture);

app.delete('/delete-Picture/:id', verifyToken, Picture.deletePicture);

//EXPORTAR LA RUTA

module.exports = app