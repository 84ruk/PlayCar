const { Router } = require('express');
const { check } = require('express-validator');
const multer = require('multer');
const upload = multer()


const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');
const { crearPaquete, obtenerPaquetes, actualizarPaquete, obtenerPaquete, borrarPaquete } = require('../controllers/paquete');

const router = Router();

router.post('/', [

      // Aquí indicas el nombre del campo en el FormData
    upload.array('files'),
    validarJWT,
    esAdminRole, 
    validarCampos,
  ], crearPaquete);

router.get('/', obtenerPaquetes);


router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
],  actualizarPaquete);

router.get('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
],  obtenerPaquete);

router.delete('/:id',[
  validarJWT,
  esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
],  borrarPaquete);



module.exports = router; 