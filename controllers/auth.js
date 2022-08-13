const { response } = require('express');
const Usuario = require('../models/user');
const bcryptjs = require('bcrypt');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        // Comprobar que exista el usuario
        const usuario = await Usuario.findOne({ email });
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos - email/password'
            });
        }
        //Validar si usuario esta activo
        if( !usuario.state ){
            return res.status(400).json({
                msg: 'Usuario / Password  no existe o no esta activo'
            });
        }
        // Comprobar que la contraseña sea correcta
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        //generar JWT
        const token = await generarJWT(usuario.id);


        res.json({
            message: 'Login correcto',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Hubo un error'
        });
    }


}


module.exports = {
    login
}