const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();


router.post('/login',[
    check('id', 'No es es un Id válido').isMongoId(),
    check('id').custom(existUserId),
    validarCampos
],)


module.exports = router;