//IMPORTACION DEL MODELO
const Products = require('../models/product.model');

//FUNCION GET
let showProducts = (req, res) => {
   Products.find({}).exec((err, data) => {
      if (err) {
         return res.json({
            status: 500,
            msg: 'Request Error: GET Function',
         });
      }

      //CONTAR LA CANTIDAD DE REGISTROS
      Products.countDocuments({}, (err, total) => {
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

//FUNCION POST
let createProduct = (req, res) => {
   let body = req.body;

   //Preguntar si vienen los datos
   if (!req.body.product) {
      return res.json({
         status: 500,
         msg: 'Product name cannot be empty',
      });
   }

   //Obtener los datos del formulario
   let product = new Products({
      product: `${body.product}`,
   });

   //Guardar en mongodb

   product.save((err, data) => {
      if (err) {
         return res.json({
            status: 400,
            msg: 'The product has already been included',
            err,
         });
      }

      res.json({
         status: 200,
         data,
         msg: 'The product has been created!',
      });
   });
};

//FUNCION PUT
let editProduct = (req, res) => {
   //CAPTURAR EL ID A ACTUALIZAR

   let id = req.params.id;

   //CAPTURAR EL FORMULARIO

   let body = req.body;

   //Se valida que exista

   Products.findById(id, (err, data) => {
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
            msg: 'The product does not exists',
         });
      }

      //Se actualizan registros
      let dataChangeDb = (id, body) => {
         return new Promise((resolve, reject) => {
            let newData = {
               product: `${body.product}`,
            };

            //Actualizar en mongodb
            Products.findByIdAndUpdate(
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
               msg: 'The product has been updated!',
            });
         })
         .catch((response) => {
            response['res'].json({
               status: 400,
               err: response['err'],
               msg: 'Error editing the product',
            });
         });
   });
};

//FUNCION DELETE
let deleteProduct = (req, res) => {
   //CAPTURAR EL ID A ELIMINAR

   let id = req.params.id;

   //1. Se valida que el ID exista

   Products.findById(id, (err, data) => {
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
            msg: 'The product does not exists',
         });
      }

      //Borrar registro en MongoDB

      Products.findByIdAndRemove(id, (err, data) => {
         if (err) {
            return res.json({
               status: 500,
               msg: 'Request Error: DELETE Function',
               err,
            });
         }

         res.json({
            status: 200,
            msg: 'The product has been deleted!',
         });
      });
   });
};

//EXPORTAR FUNCIONES DEL CONTROLADOR
module.exports = {
   showProducts,
   createProduct,
   editProduct,
   deleteProduct,
};
