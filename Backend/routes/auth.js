const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/valida-campos');

const { login, logout } = require('../controllers/auth');
const { validarJWT } = require('../middlewares');

const router = Router();



router.post("/login", 
[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),   
    validarCampos,
    
], login);

router.post("/logout", logout);



module.exports = router;