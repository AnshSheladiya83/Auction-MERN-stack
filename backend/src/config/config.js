/**
        * File Name: config.js
        */
       const envFound = require('dotenv').config();
       
       module.exports = {
         port: parseInt(process.env.PORT, 10),
         node_env: process.env.NODE_ENV,
         database: {
           development: {
             url: process.env.DEV_DATABASE_URL || 'mongodb://localhost:27017/test_autoback',
           },
           test: {
             url: process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/myapp_test',
           },
           production: {
             url: process.env.PROD_DATABASE_URL || 'mongodb://user:password@mongo-db-instance-name:27017/myapp_prod',
           },
         },
         mysql_database:{
           host: process.env.MYSQL_DB_HOST,
           user: process.env.MYSQL_DB_USER,
           password: process.env.MYSQL_DB_PASSWORD
         },
         jwtSecret: process.env.JWT_SECRET || 'mysecretkey',
         jwtEmailVerificationSecret: process.env.EMAIL_VERIFICATION_SECRET || 'myemailverificationsecretkey',
         CacheExpirationTimeInSeconds: process.env.CACHE_EXPIRE_TIME || '3600',
         google: {
           clientID: process.env.GOOGLE_CLIENT_ID,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET,
           callbackURL: process.env.GOOGLE_CALLBACK_URL,
         },
         mail: {
           mail_user: process.env.MAIL_USER,
           mail_pass: process.env.MAIL_PASS,
         },
         cloudinary: {
           cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
           api_key: process.env.CLOUDINARY_API_KEY,
           api_secret: process.env.CLOUDINARY_API_SECRET,
         },
         url: {
           base_url: process.env.BASE_URL,
         },
       };