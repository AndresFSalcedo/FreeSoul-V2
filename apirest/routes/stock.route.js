const express = require('express');
const app = express();

//IMPORTAR CONTROLADOR

const Stock = require('../controllers/stock.controller');

//IMPORTAR MIDDLEWARE

const { verifyToken } = require('../middlewares/autentification')

//CREACION DE RUTA HTTP

app.get('/show-stock', Stock.showStock);

app.post('/create-stock', verifyToken, Stock.createStock);

app.put('/edit-stock/:id', verifyToken, Stock.editStock);

app.delete('/delete-stock/:id', verifyToken, Stock.deleteStock);

//EXPORTAR LA RUTA

module.exports = app;