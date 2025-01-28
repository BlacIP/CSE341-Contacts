// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API documentation for the Contacts application',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    //basePath: '/contacts',
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);