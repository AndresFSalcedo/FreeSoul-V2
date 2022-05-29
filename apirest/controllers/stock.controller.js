//IMPORTAR MODELO

const Stock = require('../models/stock.model');

// FUNCION GET

let showStock = (req, res) => {
   Stock.find({}).exec((err, data) => {
      if (err) {
         return res.json({
            status: 500,
            msg: 'Request Error: GET Function',
         });
      }

      //CONTAR LA CANTIDAD DE REGISTROS

      Stock.countDocuments({}, (err, total) => {
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

let createStock = (req, res) => {
   let body = req.body;

   //SE PREGUNTA SI VIENEN TODOS LOS CAMPOS

   if (!req.body.productType) {
      res.json({
         status: 500,
         msg: 'The product type cannot be empt',
      });
   }

   if (!req.body.design) {
      res.json({
         status: 500,
         msg: 'The design cannot be empt',
      });
   }

   if (!req.body.codColor) {
      res.json({
         status: 500,
         msg: 'The color cannot be empt',
      });
   }

   if (!req.body.price) {
      res.json({
         status: 500,
         msg: 'The price cannot be empt',
      });
   }

   if (!req.body.S) {
      res.json({
         status: 500,
         msg: 'The S size cannot be empt',
      });
   }

   if (!req.body.M) {
      res.json({
         status: 500,
         msg: 'The M size cannot be empt',
      });
   }

   if (!req.body.L) {
      res.json({
         status: 500,
         msg: 'The L size cannot be empt',
      });
   }

   if (!req.body.XL) {
      res.json({
         status: 500,
         msg: 'The XL size cannot be empt',
      });
   }

   // OBETENER LOS DATOS DEL FORMULARIO PARA PASARLOS AL MODELO
   let stock = new Stock({
      productType: `${body.productType}`,
      design: `${body.design}`,
      codColor: `${body.codColor}`,
      price: `${body.price}`,
      S: `${body.S}`,
      M: `${body.M}`,
      L: `${body.L}`,
      XL: `${body.XL}`,
      productCode: `${body.productType}-${body.design}`,
   });

   //GUARDAR EN MONGODB

   stock.save((err, data) => {
      if (err) {
         return res.json({
            status: 400,
            msg: 'Error storing the item in the database',
            err,
         });
      }

      res.json({
         status: 200,
         data,
         msg: 'The item has been created!',
      });
   });
};

//FUNCION PUT

let editStock = (req, res) => {
   //Capturar el ID a actualizar

   let id = req.params.id;

   // Obtener el cuerpo del formulario

   let body = req.body;

   //1. Se valida que el ID exista

   Stock.findById(id, (err, data) => {
      if (err) {
         return res.json({
            status: 500,
            msg: 'Request Error: PUT Function',
            err,
         });
      }

      if (!data) {
         return res.json({
            status: 400,
            msg: 'Item does not exists',
         });
      }

      //2. Actualizamos registros

      let dataChangeDb = (id, body) => {
         return new Promise((resolve, reject) => {
            let newData = {
               productType: body.productType,
               design: body.design,
               price: body.price,
               codColor: body.codColor,
               S: body.S,
               M: body.M,
               L: body.L,
               XL: body.XL,
               productCode: `${body.productType}-${body.design}`,
            };

            //Actualizamos en MongoDb

            Stock.findByIdAndUpdate(
               id,
               newData,
               {
                  new: true,
                  runValidators: true,
               },
               (err, data) => {
                  if (err) {
                     let response = {
                        res: res,
                        err: err,
                     };
                     reject(response);
                  }

                  let response = {
                     res: res,
                     data: data,
                  };

                  resolve(response);
               }
            );
         });
      };

      //SINCRONIZAMOS LAS PROMESAS

      dataChangeDb(id, body)
         .then((response) => {
            response['res'].json({
               status: 200,
               data: response['data'],
               msg: 'The item has been updated!',
            });
         })
         .catch((response) => {
            response['res'].json({
               status: 400,
               err: response['err'],
               msg: 'Error editing the item',
            });
         });
   });
};

// FUNCIOND DELETE

let deleteStock = (req, res) => {
   //Capturar el ID a actualizar

   let id = req.params.id;

   //1. Se valida que el ID exista

   Stock.findById(id, (err, data) => {
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
            msg: 'Item does not exists',
         });
      }

      //Borrar registro en MongoDB

      Stock.findByIdAndRemove(id, (err, data) => {
         if (err) {
            return res.json({
               status: 500,
               msg: 'Request Error: DELETE Function',
               err,
            });
         }

         res.json({
            status: 200,
            msg: 'The item has been deleted!',
         });
      });
   });
};

//EXPORTAMOS FUNCIONES DEL CONTROLADOR

module.exports = {
   showStock,
   createStock,
   editStock,
   deleteStock,
};
