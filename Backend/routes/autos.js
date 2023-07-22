const { Router } = require('express');
const { check } = require('express-validator');


const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');
const { crearAuto, obtenerAutos, obtenerAuto, actualizarAuto, borrarAuto } = require('../controllers/auto');

const router = Router();

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La descripcion es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(), 
    validarCampos
    ], crearAuto);


router.get('/',[
    /* validarJWT, */
    validarCampos
], obtenerAutos);

router.get('/:id',[
    /* validarJWT, */
    validarCampos
], obtenerAuto);

router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
],  actualizarAuto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
    ], borrarAuto);



module.exports = router; 