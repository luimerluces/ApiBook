const jwt=require('jsonwebtoken');
const MY_Configuration = require('../constante/constante');
exports.ensureToken = function(req, res, next) {
    if(!req.headers.authorization) {
        return res
        .status(403)
        .send({message: "Es necesario el token de autenticación"});
    }else{
        var token = req.headers['authorization']
        var idToken = token.split(' ')[1]
        if(token) {
            jwt.verify(idToken, MY_Configuration.secret, (err, decoded) => {
            if(err) {
                 return res.status(400).send({message: "Su token ha expirado"});
            }
            next()
            })
        }
    }
}