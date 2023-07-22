const { Router } = require('express');
const { check } = require('express-validator');
const multer = require('multer');
const upload = multer()
/* const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

// Configurar la conexión con S3
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

const s3 = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

// Configurar Multer para usar S3 como almacenamiento
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});
 */
// Utilizar upload.array() o upload.single() según corresponda en tus rutas o controladores para procesar los archivos enviados.


const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');
const { crearPaquete, obtenerPaquetes, actualizarPaquete, obtenerPaquete } = require('../controllers/paquete');

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

    /* 
router.get('/:id',[
    validarJWT,
    validarCampos
], obtenerAuto);


router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
    ], borrarAuto);
 */


module.exports = router; 