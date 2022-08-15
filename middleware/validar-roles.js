const { response } = require('express')


const adminRole = ( req, res = response, next ) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se debe validar token de usuario primero'
        });
    }

    const { role, name } = req.usuario
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${name} no tiene permisos para realizar esta acción`
        })
    }

    next();
}


module.exports = {
    adminRole
}