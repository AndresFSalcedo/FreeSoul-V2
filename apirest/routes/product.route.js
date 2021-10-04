const express = require('express');
const app = express();

//IMPORTAR CONTROLADOR

const Product = require('../controllers/product.controller');

// IMPORTAR MIDDLEWARE

const { verifyToken } = require('../middlewares/autentification');

//CREACION DE RUTA HTTP

app.get('/show-products', verifyToken, Product.showProducts);
app.post('/create-product', verifyToken, Product.createProduct);
app.put('/edit-product/:id', verifyToken, Product.editProduct);
app.delete('/delete-product/:id', verifyToken, Product.deleteProduct);

//EXPORTAR LA RUTA
module.exports = app;