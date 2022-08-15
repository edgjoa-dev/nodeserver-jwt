

const  validarCampos  = require('../middleware/validar-campos');
const  validarJWT  = require('../middleware/validar-jwt');
const  tieneRole = require('../middleware/validar-roles');
const  adminRole = require('../middleware/validar-roles');


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...tieneRole,
    ...adminRole
}