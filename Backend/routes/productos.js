const { Router } = require('express');

const { obtenerProductos } = require("../controllers/productos");
const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');


const router = Router();


router.get('/',[
    validarJWT,
    esAdminRole,
    validarCampos
], obtenerProductos);

    

module.exports = router; 