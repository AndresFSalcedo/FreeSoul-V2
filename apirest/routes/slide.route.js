const express = require('express');
const app = express();

//IMPORTAR CONTROLADOR

const Slide = require('../controllers/slide.controller');

//IMPORTAR MIDDLEWARE

const { verifyToken } = require('../middlewares/autentification');

//CREACION DE RUTA HTTP

app.get('/show-slide', Slide.showSlide);

app.post('/create-slide', verifyToken, Slide.createSlide);

app.put('/edit-slide/:id', verifyToken, Slide.editSlide);

app.delete('/delete-slide/:id', verifyToken, Slide.deleteSlide);

app.get('/show-slideImg/:image', Slide.showSlideImg)

//EXPORTAR LA RUTA

module.exports = app