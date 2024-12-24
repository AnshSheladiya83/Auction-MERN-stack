/**
    * File Name: mongoose-connection.js
    */
   const mongoose = require('mongoose');
   const config = require('../config/config');
   
   const options = {
     serverSelectionTimeoutMS: 5000, // time before failing initial connection
     socketTimeoutMS: 45000, // time before timing out queries
     family: 4, // use IPv4, skip trying IPv6
   };
   console.log('Connecting to MongoDB...');
     mongoose
       .connect(config.database[process.env.NODE_ENV || 'development'].url, options)
       .then(() => {
         console.log('MongoDB connected!');
         retries = 0;
       })
       .catch((err) => {
       });
   