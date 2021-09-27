const express = require('express');
const app = express();

//IMPORTAR CONTROLADOR

const ClientReserve = require('../controllers/client.reserve.controller');

// //CREACION DE RUTA HTTP

app.get('/show-clientReserve', ClientReserve.showClientReserve);

app.post('/create-clientReserve', ClientReserve.createClientReserve);

app.put('/edit-clientReserve/:id', ClientReserve.editClientReserve);

app.delete('/delete-clientDelete/:id', ClientReserve.deleteClientReserve);

//EXPORTAR LA RUTA

module.exports = app;