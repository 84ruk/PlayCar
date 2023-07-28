const { Router } = require('express');
const { check } = require('express-validator');
const multer = require('multer');
const upload = multer()

const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');
const { crearAuto, obtenerAutos, obtenerAuto, actualizarAuto, borrarAuto } = require('../controllers/auto');

const router = Router();

router.post('/', [
    upload.array('files'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('marca', 'La marca es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('precio', 'El precio debe de ser mayor a 100').isFloat({min: 100}),
    validarJWT,
    esAdminRole, 
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