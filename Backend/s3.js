const fs = require('fs')
const { PutObjectCommand, GetObjectCommand, ListObjectsCommand } =  require('@aws-sdk/client-s3');
require('dotenv').config();
const { S3Client, AbortMultipartUploadCommand } = require('@aws-sdk/client-s3')

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

const client = new S3Client({ region: AWS_BUCKET_REGION, credentials: {

    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY
    }
    });

    async function uploadFile(file) {
        /* console.log('file', file); */
        const stream = file.buffer;
        const encodedFileName = encodeURIComponent(file?.originalname);
        const uploadParams = {
          Bucket: AWS_BUCKET_NAME,
          Body: stream,
          Key: encodedFileName,
        };
        const command = new PutObjectCommand(uploadParams);
        await client.send(command);
    
        // Construir el URL del archivo
        const region = AWS_BUCKET_REGION;
        const fileUrl = `https://${AWS_BUCKET_NAME}.s3.${region}.amazonaws.com/${encodedFileName}`;
        /* console.log('fileUrl', fileUrl); */
        // Retornar el URL del archivo
        return fileUrl;
      }
      
/*       
      async function readFile(file) {
        const command = new GetObjectCommand({
          Bucket: AWS_BUCKET_NAME,
          Key: file
        });
        return await client.send(command);
      }
 */
      async function getFiles() {
        const command = new ListObjectsCommand({
          Bucket: AWS_BUCKET_NAME
      });
      const result = await client.send(command);
      console.log('result', result);
      return result;
    }

    async function getFile(file) {

        const command = new GetObjectCommand({
          Bucket: AWS_BUCKET_NAME,
          Key: file
        });
        console.log('command', command);
        return await client.send(command);
      
    }

    async function downloadFile(file) {

        const command = new GetObjectCommand({
          Bucket: AWS_BUCKET_NAME,
          Key: file
        });
        console.log('command', command);
        return await client.send(command);
      
    }

    async function getFileURL(file) {

      const command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: file
      });
      console.log('command', command);
      return await getSignUrl(client, command, );
    
  }


module.exports = {
    uploadFile,
    getFiles,
    getFile, 
}