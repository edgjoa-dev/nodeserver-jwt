const {Router} = require('express');
const { check } = require('express-validator');

const {userGet, postUser, putUser, patchUser, deleteUser } = require('../controllers/user');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const { isRoleValid, emailExist, existUserId } = require('../helpers/db-validators');


const router = Router();


router.get('/', userGet)


router.put('/:id',[
    check('id', 'No es es un Id válido').isMongoId(),
    check('id').custom(existUserId),
    check('role').custom( isRoleValid ).not().isEmpty(),
    validarCampos
], putUser)


router.post('/',[
    check('name', 'Name no es válido').not().isEmpty(),
    check('email', 'e-mail es requerido').custom(emailExist).isEmail(),
    check('password', 'Password no es válido').isLength({min: 8}),
    check('role').custom( isRoleValid ).not().isEmpty(),
    validarCampos,
],postUser)


router.patch('/', patchUser)


router.delete('/:id',[
    validarJWT,
    check('id', 'No es es un Id válido').isMongoId(),
    check('id').custom(existUserId),
    validarCampos
], deleteUser)


module.exports = router;