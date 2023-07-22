const { Router } = require('express');
const { check } = require('express-validator');

const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto  } = require("../controllers/productos");
const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');
const { existeProductoPorId } = require('../helpers/db-validators');
const producto = require('../models/producto');

const router = Router();

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(), 
    validarCampos
    ], crearProducto);


router.get('/',[
    validarJWT,
    esAdminRole,
    validarCampos
], obtenerProductos);

router.get('/:id',[
    validarJWT,
    esAdminRole,
    validarCampos
], obtenerProducto);

router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(id => existeProductoPorId(id)),
    validarCampos
],  actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(id => existeProductoPorId(id)),
    validarCampos
    ], borrarProducto);

    

module.exports = router; 