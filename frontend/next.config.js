// next.config.js
module.exports = {
    images: {
      domains: ['fotosplaycar.s3.us-east-2.amazonaws.com'],
    },
    env: {
      URL_BACKEND: process.env.URL_BACKEND,
    }
  };
  