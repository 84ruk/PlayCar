const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");



const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
// create s3 instance using S3Client 
// (this is how we create s3 instance in v3)
const s3 = new S3Client({

    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY
    },
    region: AWS_BUCKET_REGION
    })

    const s3Storage = multerS3({
        s3: s3, // s3 instance
        bucket: "my-images", // change it as per your project requirement
        acl: "public-read", // storage access type
        metadata: (req, file, cb) => {
            cb(null, {fieldname: file.fieldname})
        },
        key: (req, file, cb) => {
            const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
            cb(null, fileName);
        }
    });
    
    function sanitizeFile(file, cb) {
        // Define the allowed extension
        const fileExts = [".png", ".jpg", ".jpeg", ".gif"];
    
        // Check allowed extensions
        const isAllowedExt = fileExts.includes(
            path.extname(file.originalname.toLowerCase())
        );
    
        // Mime type must be an image
        const isAllowedMimeType = file.mimetype.startsWith("image/");
    
        if (isAllowedExt && isAllowedMimeType) {
            return cb(null, true); // no errors
        } else {
            // pass error msg to callback, which can be displaye in frontend
            cb("Error: File type not allowed!");
        }
    }
    
const uploadImage = multer({
        storage: s3Storage,
        fileFilter: (req, file, callback) => {
            sanitizeFile(file, callback)
        },
        limits: {
            fileSize: 1024 * 1024 * 2 // 2mb file size
        }
    })

    module.exports = {
        uploadImage
    }