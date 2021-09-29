const express = require('express');
const app = express();

//IMPORTAR CONTROLADOR

const ClientReserve = require('../controllers/client.reserve.controller');

//IMPORTAR MIDDLEWARE

const { verifyToken } = require('../middlewares/autentification')

// //CREACION DE RUTA HTTP

app.get('/show-clientReserve', verifyToken, ClientReserve.showClientReserve);

app.post('/create-clientReserve', ClientReserve.createClientReserve);

app.put('/edit-clientReserve/:id', verifyToken, ClientReserve.editClientReserve);

app.delete('/delete-clientReserve/:id', verifyToken, ClientReserve.deleteClientReserve);

//EXPORTAR LA RUTA

module.exports = app;