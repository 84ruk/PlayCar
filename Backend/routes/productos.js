const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerProductos } = require("../controllers/productos");
const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');
const { existeProductoPorId } = require('../helpers/db-validators');
const producto = require('../models/producto');

const router = Router();


router.get('/',[
    validarJWT,
    esAdminRole,
    validarCampos
], obtenerProductos);

    

module.exports = router; 