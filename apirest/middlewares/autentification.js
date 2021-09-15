const jwt = require('jsonwebtoken');

//VERIFICAR TOKEN

let verifyToken = (req, res, next)=>{

	let token = req.get('Authorization')

	jwt.verify(token, process.env.SECRET, (err, decoded)=>{

		if(err){

			return res.json({

				status:401,
				mensaje:"Token de autorizacion no es valido"
			})
		}

		req.username = decoded.username;

		next();

	})

}

module.exports = {
	verifyToken
}