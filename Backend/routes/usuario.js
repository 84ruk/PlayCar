const express = require('express');
const router = express.Router();
const { obtenerUsuario } = require('../controllers/usuario');
const { validarJWT } = require('../middlewares')
// Ruta para obtener los usuarios
router.get('/', validarJWT, obtenerUsuario);

module.exports = router;