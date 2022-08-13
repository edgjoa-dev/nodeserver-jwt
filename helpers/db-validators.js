const Role = require('../models/role');
const User = require('../models/user');



    const isRoleValid = async(role = '') => {

        const existRole = await Role.findOne({ role });
        if(!existRole){
            throw new Error(`El rol registrado: ${role}, no es válido en la base de datos`);
        }
    }

    const emailExist = async(email = '') => {

        const existEmail = await User.findOne({ email });
            if (existEmail) {
                throw new Error(`El email: ${email}, ya existe en la base de datos`);
            }
    }


    const existUserId = async( id ) => {

        const existUser = await User.findById( id );
            if (!existUser) {
                throw new Error(`El id: ${id}, no existe en la base de datos`);
            }
    }

module.exports = {
    isRoleValid,
    emailExist,
    existUserId
};