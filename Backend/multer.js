const multer = require('multer');

// Configura el almacenamiento de multer
const storage = multer.memoryStorage();

// Configura los tipos de archivos permitidos
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('El archivo debe ser una imagen'), false);
  }
};

// Configura la instancia de multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // Tamaño máximo del archivo: 5MB
  },
});

module.exports = { upload };
