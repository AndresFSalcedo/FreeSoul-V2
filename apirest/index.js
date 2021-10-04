// UBICAMOS LOS REQUERIMIENTOS
require('./config')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// CREAMOS VARIABLE PARA TENER TODAS LAS FUNCIONALIDADES DE EXPRESS
const app = express();

//MIDDLEWARE PARA BODY PARSER
app.use(bodyParser.urlencoded({limit:'10mb', extended: false}));
app.use(bodyParser.json({limit:'10mb', extended: false}));

//MIDDLEWARE PARA FILE UPLOAD
app.use(fileUpload());

//EJECUTANDO CORS
app.use(cors({

	origin: 'http://localhost:3000'
}));

//IMPORTACIONES DE RUTAS
app.use(require('./routes/slide.route'))
app.use(require('./routes/stock.route'))
app.use(require('./routes/picture.route'))
app.use(require('./routes/admin.route'))
app.use(require('./routes/blog.route'))
app.use(require('./routes/client.reserve.route'))
app.use(require('./routes/user.route'))
app.use(require('./routes/product.route'))

// CONEXION A LA BASE DE DATOS
mongoose.connect('mongodb+srv://Andres:Colombia1819@cluster0.zwotq.mongodb.net/freesoul', {
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