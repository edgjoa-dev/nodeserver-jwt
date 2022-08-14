const { response, request } = require('express')
const jwt = require('jsonwebtoken');

const Usuario = require('../models/user');


const validarJWT = async(req = request, res = response, next) => {

const token = req.header('validate-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token'
        });
    }

    try {

        const { uid, role } = jwt.verify(token, process.env.JWT_SECRET);

        const usuario = await Usuario.findById(uid);

        req.usuario = usuario;



        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al validar el token'
        });
    }

    next();
}


module.exports = {
    validarJWT
};