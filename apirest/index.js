// UBICAMOS LOS REQUERIMIENTOS
require('./config')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors')

// CREAMOS VARIABLE PARA TENER TODAS LAS FUNCIONALIDADES DE EXPRESS

const app = express();

//MIDDLEWARE PARA BODY PARSER

app.use(bodyParser.urlencoded({limit:'10mb', extended: false}));
app.use(bodyParser.json({limit:'10mb', extended: false}));
app.use(cors())

//MIDDLEWARE PARA FILE UPLOAD

app.use(fileUpload())

//IMPORTACIONES DE RUTAS

app.use(require('./routes/slide.route'))
app.use(require('./routes/stock.route'))
app.use(require('./routes/picture.route'))
app.use(require('./routes/admin.route'))
app.use(require('./routes/blog.route'))

// CONEXION A LA BASE DE DATOS

mongoose.connect('mongodb://localhost:27017/freesouldb', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err, res) => {
	if (err) throw err;
	console.log("Conectado a la BD")
});


// SALIDA PUERTO HTTP

app.listen(process.env.PORT, () => {

	console.log(`Habilitado puerto ${process.env.PORT}`)
})
