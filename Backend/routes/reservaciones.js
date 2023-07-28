const { Router } = require('express');
const { check } = require('express-validator');


const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');
const { crearReservacion, crearReservacionAuto, obtenerReservaciones, obtenerReservacion, crearReservacionPaquete, crearReservacionHospedaje,actualizarReservacion } = require('../controllers/reservacion');
const { validarFechasMiddleware,  validarFecha, validarFechasHospedajeMiddleware, validarFechasAutoMiddleware } = require('../middlewares/valida-fechas');

const router = Router();

// Endpoint para crear una reserva
router.post('/',[
    validarJWT,
    validarFechasMiddleware,
    validarCampos
], crearReservacion );
  
router.post('/auto',[
    validarJWT,
    validarFechasAutoMiddleware,
    validarCampos 
], crearReservacionAuto );


router.post('/hospedaje',[
    validarJWT,
    validarFechasHospedajeMiddleware,
    validarCampos 
], crearReservacionHospedaje );
  

router.post('/paquete',[
    validarJWT,
    validarFechasMiddleware,
    validarCampos 
], crearReservacionPaquete );
  

router.get('/',[
    validarJWT,
    validarCampos 
], obtenerReservaciones );
  

router.get('/:id',[
    validarJWT,
    validarCampos 
], obtenerReservacion);
  

router.put('/:id',[
    validarJWT,
    esAdminRole,
    validarFecha,
    validarCampos 
], actualizarReservacion);
  


module.exports = router; 