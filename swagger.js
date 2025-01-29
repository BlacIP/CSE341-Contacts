require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();
console.log('NODE_ENV:', process.env.NODE_ENV);

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API documentation for the Contacts application',
    },
    schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
    //basePath: '/contacts',
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);