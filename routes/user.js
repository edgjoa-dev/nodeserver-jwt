const {Router} = require('express');
const { check } = require('express-validator');

const {userGet, postUser, putUser, deleteUser } = require('../controllers/user');

const { isRoleValid, emailExist, existUserId } = require('../helpers/db-validators');
const { validarCampos, validarJWT, tieneRole, adminRole } = require('../middleware');

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

router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    //adminRole, No se puede borrar un usuario si no es admin
    check('id', 'No es es un Id válido').isMongoId(),
    check('id').custom(existUserId),
    validarCampos
], deleteUser)


module.exports = router;