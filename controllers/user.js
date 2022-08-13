const { response } = require('express');
const bcryptjs = require('bcrypt');
const User = require('../models/user');


const userGet = async(req, res = response) => {

    //const {q, nombre = 'No name', apikey, page = 1, limit} = req.query;
    const { limit=10, from=0 } = req.query;
    const query = { state: true };

    // const users = await User.find(query)
    // .skip( Number(from) )
    // .limit( Number(limit) )

    // const total = await User.countDocuments(query)

    const [totalArray, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number(from) )
            .limit( Number(limit) )
    ])

    res.json({
        totalArray,
        users
    });
}


const postUser = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    //Hashear password y guardarlo en la base de datos
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar usuario en la base de datos
    await user.save();

    res.json({
        user
    });
}


const putUser = async (req, res = response) => {

    const { id } = req.params;
    const {_id, password, google, email, ...resto} = req.body;

    //Validar contra base de datos
if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
}
    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        user
    });

}


const patchUser = (req, res = response) => {
    res.status(400).json({
        message: 'Patch'
    });
}


const deleteUser = async (req, res = response) => {

    const { id } = req.params;

    const usuario = await User.findByIdAndUpdate(id, { state: false });
    //const user = await User.findByIdAndDelete(id);
    const ususarioAutenticado = req.usuario;


    res.json( { usuario, ususarioAutenticado } );
}



module.exports = {
    userGet,
    putUser,
    postUser,
    patchUser,
    deleteUser
}