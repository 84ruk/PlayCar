const { Router } = require('express');
const { check, query } = require('express-validator');

const { 
  validarCampos,
  validarJWT,
  tieneRole, 
  esAdminRole} = require('../middlewares')

const { emailExiste, existeUsuarioPorId, emailNoExiste, comprobarToken } = require('../helpers/db-validators'); 

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch, usuariosOlvidePassword, usuarioGet, confirmar, cambiarPassword } = require('../controllers/usuarios');

const router = Router();


router.get(
  "/",
  [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    query("limite", "El limite debe ser un numero")
      .isNumeric()
      .optional()
      .isInt(),
    query("desde", "El desde debe ser un numero").isNumeric().optional(),
    validarCampos,
  ],
  usuariosGet
);

router.put(
  "/:id",
  [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosPut
);

/* router.post(
  "/olvide-password",
  [
    check("correo", "El correo no es valido").isEmail(),
    check( 'correo' ).custom( emailNoExiste ),
    validarCampos
  ],
  usuariosOlvidePassword
);

 */
router.post(
  "/",
  [
    // middleware
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre", "El nombre debe tener entre 6 y 30 caracteres").isLength({
      min: 6,
      max: 30,
    }),
    check("correo", "El correo no es valido").isEmail(),
    check( 'correo' ).custom( emailExiste ),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    /* check("rol", "El rol no es valido").isIn(["ADMIN_ROLE", "USER_ROLE"]), */
    validarCampos
    ]
    ,
  usuariosPost
);

router.delete('/:id',[
  validarJWT,
  esAdminRole,
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete );

router.get('/:id',[
  validarJWT,
  
  /* esAdminRole, */
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(existeUsuarioPorId),
  validarCampos
], usuarioGet );

router.get('/confirmar/:token', confirmar );

router.post('/olvide-password',[
  check('correo', 'El correo no es valido').isEmail(),
  validarCampos
], usuariosOlvidePassword);

router.patch('/olvide-password/:token',[
  check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6}),

/*   check('token').custom(comprobarToken),
 */  validarCampos
], cambiarPassword);
 

module.exports = router;