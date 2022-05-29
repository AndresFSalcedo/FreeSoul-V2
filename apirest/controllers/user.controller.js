//IMPORTAR MODELO

const User = require('../models/user.model');

// FUNCION GET

let showUser = (req, res) => {
   User.find({}).exec((err, data) => {
      if (err) {
         return res.json({
            status: 500,
            msg: 'Request Error: GET Function',
         });
      }

      //CONTAR LA CANTIDAD DE REGISTROS

      User.countDocuments({}, (err, total) => {
         if (err) {
            return res.json({
               status: 500,
               msg: 'Request Error: GET Function',
               err,
            });
         }

         res.json({
            status: 200,
            total,
            data,
         });
      });
   });
};

// FUNCION POST

let createUser = (req, res) => {
   let body = req.body;

   //SE PREGUNTA SI VIENEN TODOS LOS CAMPOS

   if (!req.body.username) {
      res.json({
         status: 500,
         msg: 'Username cannot be empty',
      });
   }

   if (!req.body.email) {
      res.json({
         status: 500,
         msg: 'Email address cannot be empty',
      });
   }

   // OBETENER LOS DATOS DEL FORMULARIO PARA PASARLOS AL MODELO
   let user = new User({
      username: `${body.username}`,
      email: `${body.email}`,
   });

   //GUARDAR EN MONGODB

   user.save((err, data) => {
      if (err) {
         return res.json({
            status: 400,
            msg: 'Email address has already been registered',
            err,
         });
      }

      res.json({
         status: 200,
         data,
         msg: 'The user has been created!',
      });
   });
};

// FUNCIOND DELETE

let deleteUser = (req, res) => {
   //CAPTURAR EL ID A ACTUALIZAR

   let id = req.params.id;

   //1. Se valida que el ID exista

   User.findById(id, (err, data) => {
      if (err) {
         return res.json({
            status: 500,
            msg: 'Request Error: DELETE Function',
            err,
         });
      }

      if (!data) {
         return res.json({
            status: 400,
            msg: 'The user does not exists',
         });
      }

      //Borrar registro en MongoDB

      User.findByIdAndRemove(id, (err, data) => {
         if (err) {
            return res.json({
               status: 500,
               msg: 'Request Error: DELETE Function',
               err,
            });
         }

         res.json({
            status: 200,
            msg: 'The user has been deleted!',
         });
      });
   });
};

//EXPORTAMOS FUNCIONES DEL CONTROLADOR

module.exports = {
   showUser,
   createUser,
   deleteUser,
};
