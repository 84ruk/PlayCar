const { Router } = require('express');
const { check } = require('express-validator');
const multer = require('multer');
const upload = multer();

const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');
const { crearHospedaje, obtenerHospedajes, obtenerHospedaje, actualizarHospedaje, borrarHospedaje } = require('../controllers/hospedaje');

const router = Router();

router.post('/', [
    
    upload.array('files'),
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('tipo', 'El tipo de hospedaje es obligatorio').not().isEmpty(),
    check('habitaciones', 'El numero de habitaciones es obligatorio').not().isEmpty(),
    check('capacidad', 'La capacidad es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    validarCampos
    ], crearHospedaje);


router.get('/', obtenerHospedajes );

router.get('/:id', obtenerHospedaje);

router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
],  actualizarHospedaje);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
    ], borrarHospedaje);



module.exports = router; 